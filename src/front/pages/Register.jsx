import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "../styles/pages/./Register.css";
import { Link } from "react-router-dom";
import animals from "../assets/img/animals.png"

const initialUser = {
    full_name: "",
    email: "",
    birthdate: "",
    gender: "",
    avatar: null,
    password: "",
};

const url = import.meta.env.VITE_BACKEND_URL;

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(initialUser);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    const fileInputRef = useRef(null);

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value,
        });
    };

    const handleConfirmChange = ({ target }) => {
        setConfirmPassword(target.value);

        if (user.password && target.value !== user.password) {
            setError((prev) => ({
                ...prev,
                confirm: "Passwords don't match",
            }));
        } else {
            setError((prev) => ({
                ...prev,
                confirm: null,
            }));
        }
    };

    const handleFileChange = ({ target }) => {
        const file = target.files[0];

        setUser({
            ...user,
            avatar: file,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (user.password !== confirmPassword) {
            setError((prev) => ({
                ...prev,
                confirm: "Passwords don't match",
            }));

            return;
        }

        const formData = new FormData();
        formData.append("full_name", user.full_name);
        formData.append("email", user.email);
        formData.append("birthdate", user.birthdate);
        formData.append("gender", user.gender);
        formData.append("password", user.password);
        formData.append("avatar", user.avatar);

        const response = await fetch(`${url}/api/register`, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            setUser(initialUser);
            fileInputRef.current.value = null;

            toast.success("The user has been successfully registered.")

            setTimeout(() => {

                navigate("/login");

            }, 2000)

        } else if (response.status == 409) {
            toast.error("User Already exist");
        } else {
            toast.error("Error creating user, please try again");
        }
    };

    return (
        <div className="register-body ">
            <Toaster position="top-center" />
            <div className="container border rounded-4 container-blue-left">
                {/* <img src={animals} alt="animales" className="register-animals col-12 col-md-6" /> */}
                <div className="row">
                    <div className=" col-12 col-md-6 text-center mt-5 mt-sm-0 pt-5 pt-sm-0 mb-none mb-sm-3 mb-0 mb-sm-5 pb-0 pb-sm-4">
                        <h1 className="mb-3 mt-5 text-light">¿Ya tienes una cuenta?</h1>
                        <p className="mb-4 fs-5 text-light fw-light">
                            Inicia Sesión para que seas parte de nuestra <br /> comunidad.
                        </p>
                        <Link className="boton-iniciar-sesion btn btn-outline-light btn-lg rounded-5 border-3">Iniciar Sesion</Link>
                    </div>
                    <div className="col-12 col-md-6">
                        <form
                            className="p-5 bg-white rounded-5 register_form "
                            onSubmit={handleSubmit}
                        >
                            <h1 className="text-center mb-4">Registrar</h1>
                            <div className="form-group mb-3">
                                <label htmlFor="forName" className="form-label">
                                    Nombre completo:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="forName"
                                    placeholder="Jhon Doe"
                                    name="full_name"
                                    onChange={handleChange}
                                    value={user.full_name}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forEmail">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="forEmail"
                                    placeholder="example@email.com"
                                    name="email"
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forBirthdate">Fecha de nacimiento:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="forBirthdate"
                                    name="birthdate"
                                    onChange={handleChange}
                                    value={user.birthdate}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forGender">Genero:</label>
                                <select
                                    onChange={handleChange}
                                    className="form-control"
                                    name="gender"
                                    id="forGender"
                                    value={user.gender}
                                >
                                    <option value="">Elije...</option>
                                    <option value="MASCULINO">Masculino</option>
                                    <option value="FEMENINO">Femenino</option>
                                    <option value="OTRO">Otro</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forAvatar">Avatar</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="forAvatar"
                                    placeholder="Avatar"
                                    name="avatar"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forPassword">Contraseñas:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="forPassword"
                                    placeholder="contraseñas"
                                    name="password"
                                    onChange={handleChange}
                                    value={user.password}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="forConfirmPassword">
                                    Confirmar contraseñas:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="forConfirmPassword"
                                    placeholder="Confirm password"
                                    name="password"
                                    onChange={handleConfirmChange}
                                    value={confirmPassword}
                                />
                                {error.confirm && (
                                    <div className="text-danger mt-2">{error.confirm}</div>
                                )}
                            </div>
                            <button className="btn btn-outline-primary col-12">
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
