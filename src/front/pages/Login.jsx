
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/pages/login.css"

import logoimg from "../assets/img/logo.png";
import animalsImg from "../assets/img/animals.png";
import googleimg from "../assets/img/google.png";


const backendUrl = import.meta.env.VITE_BACKEND_URL

const initialUser = {
    email: "",
    password: ""
}

export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [user, setUser] = useState(initialUser)

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            const formData = new FormData()
            formData.append("email", user.email)
            formData.append("password", user.password)

            const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                body: formData
            })

            const data = await response.json()

            if (response.ok) {
                dispatch({ type: "SET_TOKEN", payload: data.access_token })

                const responseUser = await fetch(`${backendUrl}/api/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${data.access_token}`
                    }
                })

                const dataUser = await responseUser.json()
                dispatch({
                    type: "SET_USER",
                    payload: dataUser.user
                })

                
                const favoritesResponse = await fetch(`${backendUrl}/api/favorites`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${data.access_token}`
                    }
                })

                if (favoritesResponse.ok) {
                    const favoritesData = await favoritesResponse.json()
                    dispatch({
                        type: "SET_FAVORITES",
                        payload: favoritesData.favorites
                    })
                }

                localStorage.setItem("token", data.access_token)
                localStorage.setItem("user", JSON.stringify(dataUser.user))

                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-body mt-5">
            <div className="container container-blue rounded-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <form className="bg-light p-5 login-form rounded-5" onSubmit={handleSubmit}>
                            <h1 className="h1-login text-center mt-5 pt-5 mb-3">Iniciar sesion</h1>
                            <div className="form-group mb-3">
                                <label htmlFor="forEmail">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="forEmail"
                                    placeholder="example@email.com"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forPassword">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="forPassword"
                                    placeholder="contraseña"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="btn mt-3 mb-3 btn-outline-primary col-12">
                                Iniciar sesion
                            </button>
                            <Link>¿Olvidaste tu contraseña?</Link>
                        </form>
                    </div>
                    <div className="col-12 col-md-6 mt-5 text-center pt-5">
                        <h1 className="text-light mt-5 pt-5 mb-3">¿Aún no tienes una cuenta?</h1>
                        <p className="fs-5 text-light fw-light mb-4">Registrate para que seas parte de nuestra comunidad.</p>
                        <Link className="boton-registrar btn btn-outline-light rounded-5 btn-lg border-3">Registrar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
