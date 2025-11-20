import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../styles/pages/stylle.css"
export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<section className="hero">
			<div className="hero-text">
			<h2>Tu Refugio de Confianza:<br/> Cuidando Vidas, Buscando Hogares</h2>
			<div className="buttons">
				<button className="btn info">Más Información</button>
				<button className="btn adopt">Adopta Ahora</button>
			</div>
			</div>
		</section>
	);
}; 