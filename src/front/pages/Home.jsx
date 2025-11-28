import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/home.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import perroimg from "./img/perritos-about.jpg";


export const HomeAndAbout = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPets = () => {
    navigate('/pets');
  };

  return (
    <>
      {/* HOME */}
      <section className="home-page">
        <div className="home-container">
          <img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-portrait-of-happy-dog-and-cat-that-looking-at-the-camera-png-image_12828737.png" alt="Refugio Patitas Felices" className="home_pets" />

          <div className="home-content">
            <h2 className="fw-bold">
              Tu Refugio de Confianza:
              <br /> Cuidando Vidas, Buscando Hogares
            </h2>

            <div className="mt-4 d-flex justify-content-center gap-3">
              <button className="btn px-4 py-2 home_btn-about"
                onClick={scrollToAbout}
              >
                Más Información
              </button>

              <button className="btn px-4 py-2 home_btn-pets"
                onClick={goToPets}
              >
                Adopta Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about-section" className="about-section fondo-mascotas">
        <div className="container">
          <div className="row align-items-center">


            <div className="col-md-6 text-center mb-4">
              <img src={perroimg} alt="Refugio Patitas Felices" className="img-fluid rounded"
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-4">Sobre Nosotros</h2>

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


            </div>

          </div>
        </div>
      </section>
    </>
  );
};
