import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";
import { Toaster, toast } from "sonner";
import "../styles/pages/petRegister.css";

const url = import.meta.env.VITE_BACKEND_URL;

export const PetEdit = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pet, setPet] = useState({
        name: "",
        species: "",
        breed: "",
        sex: "",
        birthdate: "",
        image: null,
        description: ""
    });
    const [currentImage, setCurrentImage] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await fetch(`${url}/api/pet/${petId}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log("Datos recibidos de la API:", data);

                    const speciesMap = {
                        "Perro": "DOG",
                        "Gato": "CAT",
                        "Otro": "OTHER"
                    };

                    const sexMap = {
                        "Macho": "MALE",
                        "Hembra": "FEMALE"
                    };

                    setPet({
                        name: data.name || "",
                        species: speciesMap[data.species] || data.species || "",
                        breed: data.breed || "",
                        sex: sexMap[data.sex] || data.sex || "",
                        birthdate: data.birthdate ? data.birthdate.split('T')[0] : "",
                        image: null,
                        description: data.description || ""
                    });
                    setCurrentImage(data.image || "");
                }
            } catch (err) {
                toast.error("Error al cargar los datos de la mascota");
            } finally {
                setLoading(false);
            }
        };

        if (petId) {
            fetchPet();
        }
    }, [petId]);

    const handleChange = ({ target }) => {
        setPet({
            ...pet,
            [target.name]: target.value
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPet({
            ...pet,
            image: file
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("name", pet.name);
        formData.append("species", pet.species);
        formData.append("breed", pet.breed);
        formData.append("sex", pet.sex);
        formData.append("birthdate", pet.birthdate);
        if (pet.image) {
            formData.append("image", pet.image);
        }
        formData.append("description", pet.description);

        console.log("Datos a enviar:");
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${url}/api/pet/${petId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                toast.success("Mascota actualizada con éxito.");
                setTimeout(() => {
                    navigate("/dashboard/petmanagement", { replace: true });
                    window.location.reload();
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                toast.error(`Error al actualizar: ${errorData.message || "Intenta de nuevo"}`);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            toast.error("Error inesperado, intente de nuevo más tarde.");
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Toaster position="top-center" />
            <div className="container-fluid justify-content-center mt-5 p-3 p-md-5">
                <div className="row mt-3 mt-md-5 justify-content-center">
                    <div className="col-12 col-lg-8 bg-white p-3 p-md-5 rounded-5 mb-4 mb-lg-0">
                        <h1 className="text-center pet-register_form-title">Editar Mascota</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="forPetName" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={pet.name}
                                            id="forPetName"
                                            name="name"
                                            onChange={handleChange}
                                            value={pet.name}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forSpecies" className="form-label">Especie</label>
                                        <select
                                            onChange={handleChange}
                                            value={pet.species}
                                            className="form-control"
                                            name="species"
                                            id="forSpecies"
                                        >
                                            <option value="">Elige...</option>
                                            <option value="DOG">Perro</option>
                                            <option value="CAT">Gato</option>
                                            <option value="OTHER">Otro</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forBreed" className="form-label">Raza</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={pet.breed || "Raza de la mascota"}
                                            id="forBreed"
                                            name="breed"
                                            onChange={handleChange}
                                            value={pet.breed}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="forSex" className="form-label">Sexo</label>
                                        <select
                                            className="form-control"
                                            name="sex"
                                            id="forSex"
                                            onChange={handleChange}
                                            value={pet.sex}
                                        >
                                            <option value="">Elige...</option>
                                            <option value="MALE">Macho</option>
                                            <option value="FEMALE">Hembra</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forBirthdate" className="form-label">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="forBirthdate"
                                            name="birthdate"
                                            onChange={handleChange}
                                            value={pet.birthdate}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forImage" className="form-label">Foto</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="forImage"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            ref={fileInputRef}
                                        />
                                        {currentImage && !pet.image}
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        onChange={handleChange}
                                        value={pet.description}
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                            <button type="submit" className="boton-registro btn w-100 mt-3 rounded-5">Actualizar Mascota</button>
                        </form>
                    </div>
                    <div className="col-12 col-lg-4 justify-content-center align-items-center d-flex">
                        <div className="d-flex flex-column align-items-center" style={{ maxWidth: "350px", width: "100%" }}>
                            <div className="w-100">
                                <img
                                    src={currentImage}
                                    alt="Preview"
                                    className="img-fluid mb-3 rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}