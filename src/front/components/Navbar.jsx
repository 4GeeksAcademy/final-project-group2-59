import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Logo from "../assets/img/logo.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/components/navbar.css";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
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
		<># Asegúrate de estar en tu rama local con los commits
git checkout profile

# Crear de nuevo la rama remota
git push -u origin profile

			<nav className="navbar">
				<div className="container">
					<Link to="/" className="d-flex align-items-center logo-text navbar-brand">
						<img src={Logo} className="logo-icon" />
						<span className="logo-text mb-0 h1">Patitas Felices</span>
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
						{store.user?.role === 'Admin' && (
							<Link to="/dashboard" className="nav-text">
								Dashboard
							</Link>
						)}
						{!store.token ? (
							<>
								<Link to="/login" className="nav-text">
									Ingresar
								</Link>
								<Link to="/register" className="nav-text">
									Registrarse
								</Link>
							</>
						) : (
							<>
								<Link to="/profile" className="nav-text">
									Editar Perfil
								</Link>
								<Link to="/" className="nav-text" onClick={() => {
									dispatch({ type: 'LOGOUT' });
									localStorage.removeItem('user');
								}}>
									Cerrar Sesión
								</Link>
							</>
						)}

					</div>

					<button className="offcanvas-toggle d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
						<i className="bi bi-list"></i>
					</button>

				</div>

			</nav >



			<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasNavbarLabel">
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
						{store.user?.role === 'Admin' && (
							<a className="nav-text nav-link" onClick={() => handleNavClick('/dashboard')}>
								Dashboard
							</a>
						)}
						{!store.token ? (
							<>
								<a className="nav-text nav-link" onClick={() => handleNavClick('/login')}>
									Ingresar
								</a>
								<a className="nav-text nav-link" onClick={() => handleNavClick('/register')}>
									Registrarse
								</a>
							</>
						) : (
							<>
								<a className="nav-text nav-link" onClick={() => handleNavClick('/profile')}>
									Editar Perfil
								</a>
								<a className="nav-text nav-link" onClick={() => {
									dispatch({ type: 'LOGOUT' });
									localStorage.removeItem('user');
									handleNavClick('/');
								}}>
									Cerrar Sesión
								</a>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};