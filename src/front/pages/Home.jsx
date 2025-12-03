import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/home.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


export const HomeAndAbout = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const scrollToAbout = () => {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPets = () => {
    navigate('/pets');
  };

  const goToDonate = () => {
    navigate('/donations');
  };

  return (
    <>
      {/* HOME */}
      <section className="home-page vh-100">
        <div className="home-container">
          <img src="https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-portrait-of-happy-dog-and-cat-that-looking-at-the-camera-png-image_12828737.png" alt="Refugio Patitas Felices" className="home_pets" />

          <div className="home-content">
            <h2 className="fw-bold">
              Cuidando Vidas, Buscando Hogares
            </h2>

            <div className="mt-4 d-flex justify-content-center gap-3">
              <button className="btn px-4 py-2 home_btn-green"
                onClick={scrollToAbout}
              >
                Más Información
              </button>

              <button className="btn px-4 py-2 home_btn-orange"
                onClick={goToPets}
              >
                Adopta Ahora
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about-section" className="container home_about-us-section my-5">
        <div className="home_about-us-title text-center mb-4">
          <div className="encabezado">
            <h1>Creando hogares, no solo adopciones.</h1>
          </div>
        </div>

        <div className="row my-5 align-items-center">
          <div className="col-12 col-md-6 p-5">
            <iframe
              title="Mapa Refugio"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1626.2681048091795!2d-73.06379090151707!3d-36.833372225406364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9669b5e0c92c6e7b%3A0xb06c512a84ae27b!2sTeatro%20Biob%C3%ADo!5e1!3m2!1ses-419!2scl!4v1764180545901!5m2!1ses-419!2scl"
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>


          <div className="col-12 col-md-6 px-5 home_about-us-text text-center text-md-start">
            <h2>Nuestra Historia y Misión</h2>
            <p>
              Desde 2012, Patitas Felices rescata, protege y transforma vidas peludas con amor y compromiso.
              Nuestro refugio se sostiene gracias al trabajo voluntario y las donaciones de personas que creen en nuestra misión.
            </p>
            <button
              className="boton btn home_btn-orange mt-3"
              onClick={() =>
                window.open(
                  'https://www.google.com/maps?q=Teatro+Biob%C3%ADo,+Concepci%C3%B3n,+Chile',
                  '_blank'
                )
              }
            >
              Como llegar
            </button>
          </div>
        </div>

        <div className="row home_info-stats g-3 my-5">
          <div className="col-12 col-md-4 home_about-us-text mb-3">
            <div className="p-3 text-center">
              <i className="fa-solid fa-heart d-block mb-3 home_about-us-icon"></i>
              Mas de 100 mascotas rescatadas cada año
            </div>
          </div>
          <div className="col-12 col-md-4 home_about-us-text mb-3">
            <div className="p-3 text-center home_about-us-text">
              <i className="fa-solid fa-paw  d-block mb-3 home_about-us-icon"></i>
              Adoptar salva dos vidas, la del peludito que llevas a casa y el que va a ocupar su lugar en el refugio.
            </div>
          </div>
          <div className="col-12 col-md-4 home_about-us-text mb-3">
            <div className="p-3 text-center home_about-us-text">
              <i className="fa-solid fa-heart  d-block mb-3 home_about-us-icon"></i>
              Contamos con un equipo de veterinarios y voluntarios dedicados al bienestar de cada animal.
            </div>
          </div>
        </div>



        <div className=" my-5 text-center">
          <h2 className="home_about-us-title">¿Cómo ayudar?</h2>
          <div className="botones-ayuda justify-content-center d-flex gap-3 mt-4">
            <button className="boton btn home_btn-orange"
              onClick={goToPets}
            >
              Adopta</button>
            <button className="boton btn home_btn-orange"
              onClick={goToDonate}
            >
              Dona</button>
            <button className="boton btn home_btn-orange"

            >
              Difunde</button>
          </div>
        </div>

        <div className=" my-5 text-center">
          <h2 className="home_about-us-title mb-3">Frases que nos inspiran</h2>
          <p>“No compres amor, rescátalo.”</p>
          <p>“Una adopción no cambia el mundo, pero sí el mundo de un peludito.”</p>
          <p>“Un hogar no se compra, se construye con cariño.”</p>
        </div>

        <div className=" my-5 text-center">
          <h2 className="home_about-us-title mb-3">Creado con ❤️ por nuestros <a href="/info-developers" style={{ color: 'inherit' }}>desarrolladores</a></h2>
        </div>


      </section>
    </>
  );
};
