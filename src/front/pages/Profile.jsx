import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../front/styles/pages/profile.css";

let API_URL = import.meta.env.VITE_BACKEND_URL;

export const Profile = () => {
    const { store, dispatch } = useGlobalReducer();

    const [localUser, setLocalUser] = useState({
        full_name: store.user?.full_name || "",
        email: store.user?.email || "",
        gender: store.user?.gender || "",
        birthdate: store.user?.birthdate ? store.user.birthdate.split("T")[0] : "",
    });

    const putUser = async (user) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/edit-user`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) throw new Error("Error al actualizar usuario");

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { full_name, email, birthdate, gender } = localUser;
        const updatedUser = await putUser({ full_name, email, birthdate, gender });
        if (updatedUser) {
            dispatch({ type: "SET_USER", payload: updatedUser });
            alert("Usuario actualizado correctamente");
        } else {
            alert("Error al actualizar usuario");
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalUser({ ...localUser, [name]: value });
    };
    useEffect(() => {
        if (store.user) {
            setLocalUser({
                full_name: store.user.full_name || "",
                email: store.user.email || "",
                gender: store.user.gender?.toUpperCase() || "",
                birthdate: store.user.birthdate
                    ? store.user.birthdate.split("T")[0]
                    : "",
            });
        }
    }, [store.user]);

    return (
        <div className="container mt-5 mb-5 p-4 border rounded shadow-sm bg-white profile-form">
            <div className="text-center mb-4">
                <h1 className="profile-title profile-text">Editar Contacto</h1>
            </div>

            <form className="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        name="full_name"
                        className="form-control"
                        value={localUser.full_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={localUser.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="forGender">Genero:</label>
                    <select
                        onChange={handleChange}
                        className="form-control"
                        name="gender"
                        id="forGender"
                        value={localUser.gender}
                    >
                        <option value="">Elije...</option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMENINO">Femenino</option>
                        <option value="OTRO">Otro</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="birthdate"
                        className="form-control"
                        value={localUser.birthdate}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-profile w-100 mb-3 mt-3">
                    Grabar
                </button>

                <Link to="/" className="btn btn-profile w-100 mb-3 mt-3">
                    Volver
                </Link>
            </form>
        </div>
    );
};
