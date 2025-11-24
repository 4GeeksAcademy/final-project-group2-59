import React from "react";
import "../styles/pages/footer.css";

export const Footer = () => {
    return (
        <footer className="custom-footer text-center text-md-start py-4 mt-5">
            <div className="container">
                <div className="row">

                    {/* Logo + Descripción */}
                    <div className="col-md-4 mb-4">
                        <h4 className="footer-title">Patitas Felices </h4>
                        <p className="footer-text">
                            Rescatamos, protegemos y damos una nueva oportunidad a los animales
                            que lo necesitan. ¡Gracias por apoyarnos!
                        </p>
                    </div>

                    {/* Navegación */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-subtitle">Navegación</h5>
                        <ul className="footer-links">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Mascotas</a></li>
                            <li><a href="#">Adopciones</a></li>
                            <li><a href="#">Donaciones</a></li>
                        </ul>
                    </div>

                    {/* Redes Sociales */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-subtitle">Síguenos</h5>
                        <div className="footer-social">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-tiktok"></i></a>
                        </div>
                    </div>

                </div>

                <hr />

                <p className="footer-copy mt-3">
                    © 2025 Patitas Felices – Todos los derechos reservados
                </p>
            </div>
        </footer>
    );
};
