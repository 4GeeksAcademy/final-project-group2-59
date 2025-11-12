import os
import inspect
from flask_admin import Admin
from . import models
from .models import db, User, Pet, Favorite, Bills, Donation
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    admin = Admin(app, name='4Geeks Admin',
                  theme=Bootstrap4Theme(swatch='cerulean'))

    admin.add_view(ModelView(models.User, db.session))
    admin.add_view(ModelView(models.Pet, db.session))
    admin.add_view(ModelView(models.Favorite, db.session))
    admin.add_view(ModelView(models.Bills, db.session))
    admin.add_view(ModelView(models.Donation, db.session))