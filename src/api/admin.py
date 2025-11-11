import os
import inspect
from flask_admin import Admin
from . import models
from .models import db, Usuario, Mascota, Favorito, Gastos, Donaciones
from flask_admin.contrib.sqla import ModelView
from flask_admin.theme import Bootstrap4Theme


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    admin = Admin(app, name='4Geeks Admin',
                  theme=Bootstrap4Theme(swatch='cerulean'))

    admin.add_view(ModelView(models.Usuario, db.session))
    admin.add_view(ModelView(models.Mascota, db.session))
    admin.add_view(ModelView(models.Favorito, db.session))
    admin.add_view(ModelView(models.Gastos, db.session))
    admin.add_view(ModelView(models.Donaciones, db.session))
