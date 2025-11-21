import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/navbar.css";

export const Navbar = () => {
	return (
		<nav className="navbar">
			<div className="container">
				<Link to="/" className="d-flex align-items-center logo-text">
					<img src={Logo} className="logo-icon" />
					<span className="navbar-brand logo-text mb-0 h1">Patitas Felices</span >
				</Link>
				<div className="ml-auto">
					<Link to="/" className="nav-text">
						Inicio
					</Link>
					<Link to="/pets" className="nav-text">
						Mascotas
					</Link>
					<Link to="/donations" className="nav-text">
						Donaciones
					</Link>
					<Link to="/demo" className="nav-text">
						Favoritos
					</Link>
					<Link to="/demo" className="nav-person">
						<i class="bi bi-person-circle"></i>
					</Link>
				</div>
			</div>
		</nav>);
};