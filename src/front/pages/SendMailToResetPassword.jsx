import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/pages/sendMail.css"

export const SendMailToResetPassword = () => {
    return (
        <div className="container send-mail-body">
            <h1 className="text-center">¿Olvidaste tu contraseña?</h1>
            <div className="form-group container-blue-send-mail d-flex justify-content-center rounded-4">
                <form className="bg-light p-5 send-mail-form rounded-5 d-flex flex-column">
                    <label htmlFor="forMail">Correo de recuperacion:</label>
                    <input
                        type="email" 
                        className="form-control mb-4"
                        placeholder="example@gmail.com" 
                    />

                    <button className="btn btn-outline-success mb-3">Enviar email</button>
                    <Link to="/login">Volver a inicio de sesion</Link>
                </form>
            </div>
        </div>
    )
}