import React from "react";
import "../styles/pages/about.css"

export const AboutUs = () => {
    return (
        <section className="about-section">
            <div className="about-container">

                <div className="about-image">
                    <img
                        src="/img/perritos-about.jpg"
                        alt="Refugio Patitas Felices"
                    />
                </div>

                <div className="about-text">
                    <h2>Sobre Nosotros</h2>
                    <p>
                        En <strong>Patitas Felices</strong>, trabajamos día a día para rescatar,
                        proteger y brindar una segunda oportunidad a animales que han sido
                        abandonados, maltratados o que no tienen un hogar.
                    </p>

                    <p>
                        Nuestro refugio se sostiene gracias al amor, el trabajo voluntario y
                        las donaciones de personas que creen en nuestra misión. Cada mascota
                        merece un hogar lleno de cariño y nosotros hacemos posible ese primer paso.
                    </p>

                    <button className="about-btn">Conocer Más</button>
                </div>

            </div>
        </section>
    );
};