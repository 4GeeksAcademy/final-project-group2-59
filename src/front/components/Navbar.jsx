import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png"
export const Navbar = () => {
	return (
		<nav className="navbar navbar-light ">
			<div className="container">
				<Link to="/" className="d-flex align-items-center logo-text">
					<img src={Logo} className="logo-icon" />
					<span className="navbar-brand logo-text mb-0 h1">Patitas Felices</span >
				</Link>
				<div className="ml-auto">
					<Link to="/demo" className="nav-text">
						Inicio
					</Link>
					<Link to="/demo" className="nav-text">
						Mascotas
					</Link>
					<Link to="/donations" className="nav-text">
						Donaciones
					</Link>
					<Link to="/demo" className="nav-text">
						Favoritos
					</Link>
				</div>
			</div>
		</nav>);
};