import React from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import "../styles/pages/style.css";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import fondoAbout from "./img/fondo.jpeg";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <section className="hero home-page">
      <div className="hero-text">
        <h2>Tu Refugio de Confianza:<br /> Cuidando Vidas, Buscando Hogares</h2>
        <div className="buttons">
          <button className="btn info">Más Información</button>
          <button className="btn adopt">Adopta Ahora</button>
        </div>
      </div>
    </section>
  );
};
