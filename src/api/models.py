from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
import enum
from datetime import datetime, timezone
from typing import List

db = SQLAlchemy()


class generoUsuarioEnum(enum.Enum):
    MASCULINO = "Masculino"
    FEMENINO = "Femenino"
    OTRO = "Otro"


class estatusUsuarioEnum(enum.Enum):
    ACTIVO = "Activo"
    INACTIVO = "Inactivo"
    BANEADO = "Baneado"


class rolUsuarioEnum(enum.Enum):
    ADMIN = "Admin"
    USUARIO = "Usuario"


class especieMascotaEnum(enum.Enum):
    PERRO = "Perro"
    GATO = "Gato"
    OTRO = "Otro"


class sexoMascotaEnum(enum.Enum):
    MACHO = "Macho"
    HEMBRA = "Hembra"


class estatusMascotaEnum(enum.Enum):
    ADOPTADO = "Adoptado"
    BUSCANDO_FAMILIA = "Buscando Familia"


class Usuario(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_completo: Mapped[str] = mapped_column(String(100), nullable=False)
    fecha_nacimiento: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), nullable=False)
    genero: Mapped[generoUsuarioEnum] = mapped_column(
        db.Enum(generoUsuarioEnum), nullable=False)
    correo_electronico: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), nullable=True)
    estatus: Mapped[estatusUsuarioEnum] = mapped_column(
        db.Enum(estatusUsuarioEnum), nullable=False)
    rol: Mapped[rolUsuarioEnum] = mapped_column(
        db.Enum(rolUsuarioEnum), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    contrasena: Mapped[str] = mapped_column(String(255), nullable=False)

    favoritos: Mapped[list["Favorito"]] = db.relationship(
        back_populates="usuario")
    gastos: Mapped[list["Gastos"]] = db.relationship(back_populates="usuario")

    def __repr__(self):
        return f"<Usuario {self.nombre_completo}>"

    def serialize(self):
        return {
            "id": self.id,
            "nombre_completo": self.nombre_completo,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat(),
            "genero": self.genero.value,
            "correo_electronico": self.correo_electronico,
            "avatar": self.avatar,
            "estatus": self.estatus.value,
            "rol": self.rol.value,
            "created_at": self.created_at.isoformat()
        }


class Mascota(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    fecha_nacimiento: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), nullable=False)
    especie: Mapped[especieMascotaEnum] = mapped_column(
        db.Enum(especieMascotaEnum), nullable=False)
    raza: Mapped[str] = mapped_column(
        String(100), nullable=True, default="Mestizo")
    sexo: Mapped[sexoMascotaEnum] = mapped_column(
        db.Enum(sexoMascotaEnum), nullable=False)
    estatus: Mapped[estatusMascotaEnum] = mapped_column(
        db.Enum(estatusMascotaEnum), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=True)
    imagen: Mapped[str] = mapped_column(String(255), nullable=True)

    favoritos: Mapped[list["Favorito"]] = db.relationship(
        back_populates="mascota")

    def __repr__(self):
        return f"<Mascota {self.nombre}>"

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat(),
            "especie": self.especie.value,
            "raza": self.raza,
            "sexo": self.sexo.value,
            "estatus": self.estatus.value,
            "created_at": self.created_at.isoformat(),
            "descripcion": self.descripcion,
            "imagen": self.imagen
        }


class Favorito(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(
        db.ForeignKey('usuario.id'), nullable=False)
    mascota_id: Mapped[int] = mapped_column(
        db.ForeignKey('mascota.id'), nullable=False)

    usuario: Mapped["Usuario"] = db.relationship(back_populates="favoritos")
    mascota: Mapped["Mascota"] = db.relationship(back_populates="favoritos")

    def __repr__(self):
        return f"<Favorito UsuarioID: {self.usuario_id}, MascotaID: {self.mascota_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "mascota_id": self.mascota_id
        }


class Gastos(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    monto: Mapped[float] = mapped_column(nullable=False)
    descripcion: Mapped[str] = mapped_column(String(255), nullable=True)
    numero_transaccion: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    usuario_id: Mapped[int] = mapped_column(
        db.ForeignKey('usuario.id'), nullable=False)

    usuario: Mapped["Usuario"] = db.relationship(back_populates="gastos")

    def __repr__(self):
        return f"<Gastos {self.nombre} - Monto: {self.monto}>"

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "monto": self.monto,
            "descripcion": self.descripcion,
            "numero_transaccion": self.numero_transaccion,
            "created_at": self.created_at.isoformat(),
            "usuario_id": self.usuario_id
        }


class Donaciones(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    numero_transaccion: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    monto: Mapped[float] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    mensaje: Mapped[str] = mapped_column(String(255), nullable=True)

    def __repr__(self):
        return f"<Donacion {self.nombre} - Monto: {self.monto}>"

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "numero_transaccion": self.numero_transaccion,
            "email": self.email,
            "monto": self.monto,
            "created_at": self.created_at.isoformat(),
            "mensaje": self.mensaje
        }
