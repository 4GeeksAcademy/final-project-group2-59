from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from enum import Enum
from datetime import datetime, timezone


db = SQLAlchemy()


class genderUserEnum(Enum):
    MASCULINO = "Masculino"
    FEMENINO = "Femenino"
    OTRO = "Otro"


class statusUserEnum(Enum):
    ACTIVE = "Activo"
    INACTIVE = "Inactivo"
    BANNED = "Baneado"


class roleUserEnum(Enum):
    ADMIN = "Admin"
    USER = "Usuario"


class speciesPetEnum(Enum):
    DOG = "Perro"
    CAT = "Gato"
    OTHER = "Otro"


class sexPetEnum(Enum):
    MALE = "Macho"
    FEMALE = "Hembra"


class statusPetEnum(Enum):
    ADOPTED = "Adoptado"
    LOOKING_FOR_FAMILY = "Buscando Familia"


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    birthdate: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), nullable=False)
    gender: Mapped[genderUserEnum] = mapped_column(
        db.Enum(genderUserEnum), nullable=False)
    email: Mapped[str] = mapped_column(
        String(100), unique=True, nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), nullable=True)
    status: Mapped[statusUserEnum] = mapped_column(
        db.Enum(statusUserEnum), nullable=False)
    role: Mapped[roleUserEnum] = mapped_column(
        db.Enum(roleUserEnum), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    salt: Mapped[str] = mapped_column(String(180), nullable=False)

    favorites: Mapped[list["Favorite"]] = db.relationship(
        back_populates="user")
    bills: Mapped[list["Bills"]] = db.relationship(back_populates="user")

    def __repr__(self):
        return f"<User {self.full_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "birthdate": self.birthdate.isoformat(),
            "gender": self.gender.value,
            "email": self.email,
            "avatar": self.avatar,
            "status": self.status.value,
            "role": self.role.value,
            "created_at": self.created_at.isoformat()
        }


class Pet(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    birthdate: Mapped[datetime] = mapped_column(
        db.DateTime(timezone=True), nullable=False)
    species: Mapped[speciesPetEnum] = mapped_column(
        db.Enum(speciesPetEnum), nullable=False)
    breed: Mapped[str] = mapped_column(
        String(100), nullable=True, default="Mestizo")
    sex: Mapped[sexPetEnum] = mapped_column(
        db.Enum(sexPetEnum), nullable=False)
    status: Mapped[statusPetEnum] = mapped_column(
        db.Enum(statusPetEnum), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=True)
    image: Mapped[str] = mapped_column(String(255), nullable=True)

    favorites: Mapped[list["Favorite"]] = db.relationship(
        back_populates="pet")

    def __repr__(self):
        return f"<Pet {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "birthdate": self.birthdate.isoformat(),
            "species": self.species.value,
            "breed": self.breed,
            "sex": self.sex.value,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "description": self.description,
            "image": self.image
        }


class Favorite(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey('user.id'), nullable=False)
    pet_id: Mapped[int] = mapped_column(
        db.ForeignKey('pet.id'), nullable=False)

    user: Mapped["User"] = db.relationship(back_populates="favorites")
    pet: Mapped["Pet"] = db.relationship(back_populates="favorites")

    def __repr__(self):
        return f"<Favorite UserID: {self.user_id}, PetID: {self.pet_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "pet_id": self.pet_id
        }


class Bills(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    amount: Mapped[float] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=True)
    transaction_number: Mapped[str] = mapped_column(
        String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=False)
    user_id: Mapped[int] = mapped_column(
        db.ForeignKey('user.id'), nullable=False)

    user: Mapped["User"] = db.relationship(back_populates="bills")

    def __repr__(self):
        return f"<Expense {self.name} - Amount: {self.amount}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount": self.amount,
            "description": self.description,
            "transaction_number": self.transaction_number,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id
        }


class Donation(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=True)
    transaction_number: Mapped[str] = mapped_column(String(100), nullable=True)
    email: Mapped[str] = mapped_column(String(100), nullable=True)
    amount: Mapped[float] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(db.DateTime(
        timezone=True), default=datetime.now(timezone.utc), nullable=True)
    message: Mapped[str] = mapped_column(String(255), nullable=True)

    def __repr__(self):
        return f"<Donation {self.name} - Amount: {self.amount}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "transaction_number": self.transaction_number,
            "email": self.email,
            "amount": self.amount,
            "created_at": self.created_at.isoformat(),
            "message": self.message
        }
