from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from api.routes import api
    app.register_blueprint(api, url_prefix="/api")

    return app
