"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet, Favorite, Bills, Donation
from api.utils import generate_sitemap, APIException, valid_email
from flask_cors import CORS
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
import os
import cloudinary.uploader as uploader

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=["POST"])
def register():
    
    data_form = request.form
    data_files = request.files

    fullname = data_form.get("fullname")
    email = data_form.get("email")
    password = data_form.get("password")
    birthdate = data_form.get("birthdate")
    gender = data_form.get("gender")
    avatar_db = data_files.get("avatar")
    
    if not fullname or not email or not birthdate or not gender or not password:
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
        email = email,
        fullname = fullname,
        birthdate = birthdate,
        gender = gender,
        avatar = avatar,
        is_active = True, 
        password = password,
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