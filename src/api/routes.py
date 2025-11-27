"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet, Favorite, Bills, Donation
from api.utils import generate_sitemap, APIException, valid_email, get_paypal_token, send_donation_success
from flask_cors import CORS
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import os
import cloudinary.uploader as uploader
import requests
from datetime import datetime, timezone, timedelta
from api.email_services import send_email

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

    birthdate = datetime.strptime(birthdate, "%Y-%m-%d").date()

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
    data_form = request.form

    email = data_form.get('email').strip()
    password = data_form.get('password').strip()

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
        identity=str(user.id),
        expires_delta=timedelta(hours=24)
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token
    }), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({"user": user.serialize()}), 200


@api.route('/pets', methods=['GET'])
def get_pets():
    pets = Pet.query.all()
    pets_list = [pet.serialize() for pet in pets]
    return jsonify(pets_list), 200


@api.route('/pet/<int:pet_id>', methods=['GET'])
def get_pet(pet_id):
    pet = Pet.query.get(pet_id)

    if not pet:
        return jsonify({"message": "Pet not found"}), 404

    return jsonify(pet.serialize()), 200


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


@api.route('/donations/create-paypal-order', methods=['POST'])
def create_paypal_order():
    data = request.get_json()
    amount = data.get("amount")

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    token = get_paypal_token()

    url = "https://api-m.sandbox.paypal.com/v2/checkout/orders"

    payload = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": str(amount)
                }
            }
        ],
        "application_context": {
            "return_url": "https://fictional-winner-59p6pwq7694fpxgq-3000.app.github.dev/success",
            "cancel_url": "https://fictional-winner-59p6pwq7694fpxgq-3000.app.github.dev/success"
        }
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(url, json=payload, headers=headers)
    result = response.json()

    approval_url = next(
        (l["href"] for l in result["links"] if l["rel"] == "approve"),
        None
    )
    return jsonify({
        "id": result.get("id"),
        "links": result.get("links", [])
    }), 200


@api.route('/donations/capture', methods=['POST'])
def capture_payment():
    data = request.json

    order_id = data.get("token") or data.get("orderID")

    if not order_id:
        return jsonify({"error": "Order ID or token required"}), 400

    token = get_paypal_token()

    url = f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{order_id}/capture"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }

    response = requests.post(url, headers=headers)
    result = response.json()

    payer = result["purchase_units"][0]["payments"]["captures"][0]

    return jsonify({
        "capture_id": payer["id"],
        "amount": payer["amount"]["value"],
        "payer_email": result["payer"]["email_address"],
        "payer_name": result["payer"]["name"]["given_name"]
    }), 200


@api.route('/donations/register', methods=['POST'])
def register_donation():
    data = request.json

    donation = Donation(
        name=data.get("name"),
        email=data.get("email"),
        amount=data.get("amount"),
        transaction_number=data.get("transaction_number"),
        created_at=datetime.now(timezone.utc)
    )

    db.session.add(donation)
    db.session.commit()
    send_donation_success(data.get("email"), data.get("amount"))
    return jsonify({"msg": "Donation saved", "donation": donation.serialize()}), 201


@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user_id = get_jwt_identity()

    favorites = Favorite.query.filter_by(user_id=current_user_id).all()
    pet_ids = [fav.pet_id for fav in favorites]

    return jsonify({"favorites": pet_ids}), 200


@api.route('/favorites/<int:pet_id>', methods=['POST'])
@jwt_required()
def add_favorite(pet_id):
    current_user_id = get_jwt_identity()

    pet = Pet.query.get(pet_id)
    if not pet:
        return jsonify({"message": "Pet not found"}), 404

    existing_favorite = Favorite.query.filter_by(
        user_id=current_user_id,
        pet_id=pet_id
    ).first()

    if existing_favorite:
        return jsonify({"message": "Pet already in favorites"}), 409

    new_favorite = Favorite(
        user_id=current_user_id,
        pet_id=pet_id
    )

    db.session.add(new_favorite)

    try:
        db.session.commit()
        return jsonify({"message": "Pet added to favorites", "pet_id": pet_id}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error adding to favorites", "error": str(error)}), 500


@api.route('/favorites/<int:pet_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(pet_id):
    current_user_id = get_jwt_identity()

    favorite = Favorite.query.filter_by(
        user_id=current_user_id,
        pet_id=pet_id
    ).first()

    if not favorite:
        return jsonify({"message": "Favorite not found"}), 404

    db.session.delete(favorite)

    try:
        db.session.commit()
        return jsonify({"message": "Pet removed from favorites", "pet_id": pet_id}), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error removing from favorites", "error": str(error)}), 500
    

    
@api.route("send-mail-reset-password", methods=["POST"])
def send_mail_reset_password():
    data = request.get_json()

    token = create_access_token(identity=str(data.get("email")), expires_delta=timedelta(minutes=20))

    html = f"""

            <div>
                <h1>Olvidaste tu contraseña? Ingresa al siguiente link para restablecerla:</h1>
                <a href="{os.getenv("VITE_FRONTEND_URL")}change-password?token={token}">
                    Cambiar contraseña
                </a>
            </div>

            """
    subject = "Cambiar contraseña"
    email = data.get("email")

    print(email)

    try:
        response = send_email(email, subject, html)

        if response:
            return jsonify({"message": "Correo enviado exitosamente"}), 200
        else:
            return jsonify({"message": "Intente mas tarde"}), 400
    except Exception as error:
        return jsonify({"message": f"Ocurrio un error inesperado{error}"}), 500
    
@api.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    email = get_jwt_identity()
    password = request.get_json()

    user = User.query.filter_by(email = email).one_or_none()

    if user is not None:
        salt = b64encode(os.urandom(32)).decode("utf-8")
        password = generate_password_hash(f"{password.get("password")}{salt}")

        user.salt = salt
        user.password = password

        try:
            db.session.commit()
            return jsonify({"message": "Contraseña actualizada exitosamente"})
        except Exception as error:
            return jsonify({"message": f"Error al actualizar contraseña {error}"})