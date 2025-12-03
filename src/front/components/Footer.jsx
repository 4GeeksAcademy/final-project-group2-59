import React from "react";
import "../styles/pages/footer.css";

export const Footer = () => {
    return (
        <footer className="custom-footer text-center text-md-start py-4 mt-5">
            <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className="row justify-content-center w-100">

                    {/* Logo + Descripción */}
                    <div className="col-md-4 mb-4 justify-content-center text-center">
                        <h4 className="footer-title">Patitas Felices </h4>
                        <p className="footer-text">
                            Rescatamos, protegemos y damos una nueva oportunidad a los animales
                            que lo necesitan. ¡Gracias por apoyarnos!
                        </p>
                    </div>

                    {/* Redes Sociales */}
                    <div className="col-md-4 mb-4 justify-content-center text-center">
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
