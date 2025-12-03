import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/pages/sendMail.css"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const SendMailToResetPassword = () => {
    const [email, setEmail] = useState({
        email: ""
    })

    const handleChange = ({target}) => {
        setEmail({
            ...email,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${backendUrl}/api/send-mail-reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(email)
            })
    
            if (response.ok) {
                toast.success("Correo enviado")
                setEmail({
                    email: ""
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container send-mail-body mt-5">
            <Toaster position="top-center" />
            <h1 className="text-center">¿Olvidaste tu contraseña?</h1>
            <div className="form-group container-blue-send-mail d-flex justify-content-center rounded-4">
                <form className="bg-light p-5 send-mail-form rounded-5 d-flex flex-column" onSubmit={handleSubmit}>
                    <label htmlFor="forMail">Correo de recuperacion:</label>
                    <input
                        type="email" 
                        className="form-control mb-4"
                        placeholder="example@gmail.com"
                        name="email"
                        onChange={({ target }) => setEmail({ email: target.value })}
                        value={email.email} 
                    />

                    <button className="btn btn-outline-success mb-3">Enviar email</button>
                    <Link to="/login">Volver a inicio de sesion</Link>
                </form>
            </div>
        </div>
    )
}