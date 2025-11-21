import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {Link }from "react-router-dom";
export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<section className="hero">
			<div className="hero-text">
			<h2>Tu Refugio de Confianza:<br/> Cuidando Vidas, Buscando Hogares</h2>
			<div className="buttons">
				<Link to="/about">
					<button className="btn info">Más Información</button>
				</Link>	
					<button className="btn adopt">Adopta Ahora</button>
			</div>
			</div>
		</section>
	);
}; 