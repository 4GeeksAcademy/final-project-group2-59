"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pet, Favorite, Bills, Donation
from api.utils import generate_sitemap, APIException, valid_email, get_paypal_token
from flask_cors import CORS
from base64 import b64encode
from werkzeug.security import generate_password_hash, check_password_hash
import os
import cloudinary.uploader as uploader
from datetime import datetime, timezone
import requests

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

    birthdate = datetime.strptime(birthdate, "%m-%d-%Y").date()

    salt = b64encode(os.urandom(32)).decode("utf-8")
    password = generate_password_hash(f"{password}{salt}")

    avatar = "https://i.pravatar.cc/300"

    if avatar_db is not None:
        avatar = uploader.upload(avatar)
        avatar = avatar["secure_url"]

    new_user = User(
        email=email,
        fullname=fullname,
        birthdate=birthdate,
        gender=gender,
        avatar=avatar,
        is_active=True,
        password=password,
        role=User.role.USER,
        salt=salt
    )

    db.session.add(new_user)

    try:
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as error:
        db.session.rollback()
        return jsonify({"message": "Error creating user", "Error": f"{error.args}"}), 500


@api.route("/donations/create-paypal-order", methods=["POST"])
def create_paypal_order():
    try:
        data = request.get_json()
        amount = data.get("amount")
        if not amount:
            return jsonify({"error": "Amount is required"}), 400

        access_token = get_paypal_token()
        if not access_token:
            return jsonify({"error": "Failed to generate PayPal token"}), 500

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        body = {
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
                "cancel_url": "https://example.com/cancel"
            }
        }

        paypal_response = requests.post(
            "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            headers=headers,
            json=body
        )

        print("PAYPAL STATUS:", paypal_response.status_code)
        print("PAYPAL RAW:", paypal_response.text)

        if paypal_response.status_code >= 400:
            return jsonify({
                "error": "PayPal API error",
                "details": paypal_response.json()
            }), 500

        return jsonify(paypal_response.json()), 200

    except Exception as e:
        print("SERVER ERROR:", str(e))
        return jsonify({"error": "Internal server error"}), 500


@api.route('/donations/capture', methods=['POST'])
def capture_from_paypal():
    try:
        data = request.get_json()
        token = data.get("token")

        if not token:
            return jsonify({"error": "Token is required"}), 400

        access_token = get_paypal_token()
        if not access_token:
            return jsonify({"error": "Failed to generate PayPal token"}), 500

        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {access_token}"
        }

        paypal_response = requests.post(
            f"https://api-m.sandbox.paypal.com/v2/checkout/orders/{token}/capture",
            headers=headers
        )

        capture_data = paypal_response.json()

        if capture_data.get("status") != "COMPLETED":
            return jsonify({"error": "Payment not completed"}), 400

        payer = capture_data.get("payer", {})
        purchase_unit = capture_data["purchase_units"][0]
        captured_payment = purchase_unit["payments"]["captures"][0]

        return jsonify({
            "status": capture_data["status"],
            "payer_email": payer.get("email_address"),
            "payer_name": payer.get("name", {}).get("given_name", "anonymous"),
            "amount": captured_payment["amount"]["value"],
            "currency": captured_payment["amount"]["currency_code"],
            "capture_id": captured_payment["id"]   # <-- transaction id real
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/donations/register', methods=['POST'])
def register_donation():
    try:
        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        amount = data.get("amount")
        transaction_number = data.get(
            "transaction_number")
        message = data.get("message")

        if not transaction_number:
            return jsonify({"error": "Transaction number is required"}), 400

        existing = Donation.query.filter_by(
            transaction_number=transaction_number).first()
        if existing:
            return jsonify(existing.serialize()), 200

        new_donation = Donation(
            name=name,
            email=email,
            amount=amount,
            transaction_number=transaction_number,
            message=message if message else None  # opcional
        )

        db.session.add(new_donation)
        db.session.commit()

        return jsonify({
            "message": "Donation saved successfully",
            "donation": {
                "id": new_donation.id,
                "name": new_donation.name,
                "email": new_donation.email,
                "amount": new_donation.amount,
                "transaction_number": new_donation.transaction_number,
                "message": new_donation.message,
                "created_at": new_donation.created_at
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
