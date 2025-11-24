import React from "react";
import "../styles/pages/home.css";
import "../styles/pages/about.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import perroimg from "./img/perritos-about.jpg";
import fondo from "./img/fondo.jpeg";

export const HomeAndAbout = () => {
  const { store, dispatch } = useGlobalReducer();
  

  return (
    <>
      {/* HOME */}
      <section className="home-page d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="container text-center">
          <h2 className="fw-bold" style={{ fontSize: "2.8rem", lineHeight: "1.3" }}>
            Tu Refugio de Confianza:
            <br /> Cuidando Vidas, Buscando Hogares
          </h2>

          <div className="mt-4 d-flex justify-content-center gap-3">
            <button className="btn px-4 py-2"
              style={{
                backgroundColor: "var(--color-secundario)",
                color: "white",
                borderRadius: "16px"
              }}>
              Más Información
            </button>

            <button className="btn px-4 py-2"
              style={{
                backgroundColor: "var(--color-principal)",
                color: "white",
                borderRadius: "16px"
              }}>
              Adopta Ahora
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section fondo-mascotas">
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

              <button
                className="btn mt-3 px-4 py-2"
                style={{
                  backgroundColor: "var(--color-principal)",
                  color: "white",
                  borderRadius: "16px"
                }}>
                Conocer Más
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
