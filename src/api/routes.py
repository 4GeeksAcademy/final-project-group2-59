"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet, Favorite, Bills, Donation
from api.utils import generate_sitemap, APIException, valid_email
from flask_cors import CORS
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
import cloudinary.uploader as uploader
from datetime import datetime, timezone, timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/health-check', methods=['GET'])
def health_check():
    return jsonify({"status": "OK"}), 200


@api.route('/register', methods=["POST"])
def register():

    data_form = request.form
    data_files = request.files

    full_name = data_form.get("full_name")
    email = data_form.get("email")
    password = data_form.get("password")
    birthdate = data_form.get("birthdate")
    gender = data_form.get("gender")
    avatar_db = data_files.get("avatar")

    if not full_name or not email or not birthdate or not gender or not password:
        return jsonify({"message": "Please put all the information to register."}), 400

    if not valid_email(email):
        return jsonify({"message": "The email format is not valid. Ex: example@gmail.com"}), 400

    user_exist = User.query.filter_by(email=email).first()

    if user_exist:
        return jsonify({"message": "The email is already used"}), 409

    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = generate_password_hash(f"{password}{salt}")

    avatar = "https://i.pravatar.cc/300"

    if avatar_db is not None:
        avatar = uploader.upload(avatar)
        avatar = avatar["secure_url"]

    new_user = User(
        email=email,
        full_name=full_name,
        birthdate=birthdate,
        gender=gender,
        avatar=avatar,
        password=password,
        role="USER",
        status="ACTIVE",
        salt=salt
    )

    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error creating user", "Error": f"{error.args}"}), 500

    return jsonify("Done")


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    password_with_salt = f"{password}{user.salt}"
    if not check_password_hash(user.password, password_with_salt):
        return jsonify({"message": "Invalid email or password"}), 401

    if user.status.value != "Activo":
        return jsonify({"message": "Your account is not active"}), 403

    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(hours=24)
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": user.serialize()
    }), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify(user.serialize()), 200


@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    pets_list = [pet.serialize() for pet in pets]
    return jsonify(pets_list), 200


@api.route('/petregister', methods=["POST"])
def pet_register():
    try:
        data_form = request.form
        data_files = request.files

        data = {
            "name": data_form.get("petname"),
            "birthdate": data_form.get("birthdate"),
            "species": data_form.get("species"),
            "breed": data_form.get("breed"),
            "sex": data_form.get("sex"),
            "description": data_form.get("description"),
            "image_db": data_files.get("image")
        }

        print(data)

        image = ""

        if data.get("image_db") is not None:
            image = uploader.upload(data.get("image_db"))
            image = image["secure_url"]

        new_pet = Pet(
            name=data["name"],
            birthdate=datetime.strptime(data["birthdate"], "%Y-%m-%d").date(),
            species=data["species"],
            breed=data["breed"],
            sex=data["sex"],
            status="LOOKING_FOR_FAMILY",
            description=data["description"],
            image=image,
        )

        db.session.add(new_pet)

        db.session.commit()
        return jsonify({"message": "Pet created successfully"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"message": "Error creating pet", "Error": f"{error.args}"}), 500
