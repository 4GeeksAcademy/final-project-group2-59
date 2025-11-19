
import React from "react";
import { Link} from "react-router-dom";
import "../styles/pages/login.css"

import logoimg from "../assets/img/logo.png";
import animalsImg from "../assets/img/animals.png";
import googleimg from "../assets/img/google.png";



export const Login = () => {

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
                        <form >
                            <input
                                type="email"
                                className="form-control fw-bold mb-4 gray"
                                placeholder="Correo electrónico"
                                
                                
                                required
                            >
                            </input>
                            <input
                                type="password"
                                className="form-control fw-bold mb-1 gray"
                                placeholder="Contraseña"
                                
                                
                                required
                            >
                            </input>
                            <p><Link className="link-opacity-100 mb-2" to="#">¿Olvidaste tu contraseña?</Link></p>
                            <button className="btn-login fw-bold" >
                                Iniciar Sesión
                            </button>
                            <button className="btn-google fw-bold"> <img src={googleimg} alt="google" className="imggoo" />
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
