from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, Date
from sqlalchemy.orm import Mapped, mapped_column
import enum
from datetime import date

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    fullname: Mapped[int] = mapped_column(String(80), nullable=False)
    birthdate: Mapped[str] = mapped_column(String(50), nullable=False)
    gender: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar: Mapped[str] = mapped_column(
        String(180), nullable=False, default="https://i.pravatar.cc/300")
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    salt: Mapped[str] = mapped_column(String(180), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "age": self.age,
            "gender": self.gender
            # do not serialize the password, its a security breach
        }