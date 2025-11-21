
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/pages/login.css"

import logoimg from "../assets/img/logo.png";
import animalsImg from "../assets/img/animals.png";
import googleimg from "../assets/img/google.png";




export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
        if (loginError) {
            setLoginError("");
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "El correo electrónico es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El formato del correo electrónico no es válido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es requerida";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setLoginError("");

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        user: data.user,
                        token: data.access_token
                    }
                });

                navigate("/");
            } else {
                setLoginError(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setLoginError("Error de conexión. Por favor, intenta de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div>
                <Link className="link-offset-2 link-underline link-underline-opacity-0 head" to="/">
                    <img src={logoimg} alt="logo" className="img-logo" />
                    <h3 className="baloo-chettan-2-title-letter title-green">PATITAS FELICES</h3>
                </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden">

                <img src={animalsImg} alt="perros y gatos" className="z-3 position-absolute p-g" />
                <div className="container-white ">
                    <h1 className="title-green text-center pb-3 ">Iniciar Sesión</h1>
                    <div className="py-3 px-5">
                        <form onSubmit={handleSubmit}>
                            {loginError && (
                                <div className="alert alert-danger" role="alert">
                                    {loginError}
                                </div>
                            )}

                            <input
                                type="email"
                                name="email"
                                className={`form-control fw-bold mb-2 gray ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <div className="text-danger mb-2" style={{ fontSize: "0.875rem" }}>
                                    {errors.email}
                                </div>
                            )}

                            <input
                                type="password"
                                name="password"
                                className={`form-control fw-bold mb-1 gray ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <div className="text-danger mb-2" style={{ fontSize: "0.875rem" }}>
                                    {errors.password}
                                </div>
                            )}

                            <p><Link className="link-opacity-100 mb-2" to="#">¿Olvidaste tu contraseña?</Link></p>
                            <button
                                className="btn-login fw-bold"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                            </button>
                            <button 
                                className="btn-google fw-bold" 
                                type="button"
                                disabled={isLoading}
                            > 
                                <img src={googleimg} alt="google" className="imggoo" />
                                Continuar con Google
                            </button>

                        </form>
                    </div>
                </div>
                <div className="container-green">
                    <div>
                        <h1 className="text-white">¿Aún no tienes una cuenta?</h1>
                        <p className="text-white px-5">Regístrate, ayuda a darles una segunda oportunidad a nuestros amigos peludos y descubre cómo cambiar vidas adoptando o padrinando.</p>
                        <button className="btn-record fw-bold"> <Link className="link-light link-offset-2 link-underline link-underline-opacity-0" to="/register">Registrarse</Link></button>
                    </div>
                </div>
            </div>
        </>
    );
};
