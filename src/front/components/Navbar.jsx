import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/navbar.css";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleNavClick = (path) => {
		const offcanvasElement = document.getElementById('offcanvasNavbar');
		const offcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
		if (offcanvas) {
			offcanvas.hide();
		}
		navigate(path);
	};

	return (
		<>
			<nav className="navbar">
				<div className="container">
					<Link to="/" className="d-flex align-items-center logo-text navbar-brand">
						<img src={Logo} className="logo-icon" />
						<span className="logo-text mb-0 h1 d-none d-md-inline">Patitas Felices</span>
					</Link>

					<div className="d-none d-md-flex ms-auto">
						<Link to="/" className="nav-text">
							Inicio
						</Link>
						<Link to="/pets" className="nav-text">
							Mascotas
						</Link>
						<Link to="/donations" className="nav-text">
							Donaciones
						</Link>
						<Link to="/favorites" className="nav-text">
							Favoritos
						</Link>
						<Link to="/login" className="nav-text">
							Ingresar
						</Link>
						<Link to="/register" className="nav-text">
							Registrarse
						</Link>
					</div>

					<button
						className="navbar-toggler d-md-none"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>

			<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
				<div className="offcanvas-header">
					<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
					<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
				</div>
				<div className="offcanvas-body">
					<div className="navbar-nav">
						<a className="nav-text nav-link" onClick={() => handleNavClick('/')} >
							Inicio
						</a>
						<a className="nav-text nav-link" onClick={() => handleNavClick('/pets')} >
							Mascotas
						</a>
						<a className="nav-text nav-link" onClick={() => handleNavClick('/donations')}>
							Donaciones
						</a>
						<a className="nav-text nav-link" onClick={() => handleNavClick('/favorites')}>
							Favoritos
						</a>
						<a className="nav-text nav-link" onClick={() => handleNavClick('/login')}>
							Ingresar
						</a>
						<a className="nav-text nav-link" onClick={() => handleNavClick('/register')}>
							Registrarse
						</a>
					</div>
				</div>
			</div>
		</>
	);
};