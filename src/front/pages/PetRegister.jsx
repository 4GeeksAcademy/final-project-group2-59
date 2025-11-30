import React from "react";
import "../styles/pages/petRegister.css"
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner"

const url = import.meta.env.VITE_BACKEND_URL

const initialPet = {
    petname: "",
    species: "",
    breed: "",
    sex: "",
    birthdate: "",
    image: null,
    description: ""
};

export const PetRegister = () => {

    const navigate = useNavigate();
    const [pet, setPet] = React.useState(initialPet);
    const fileInputRef = React.useRef(null);

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

        // Validación de campos requeridos
        if (!pet.petname || !pet.species || !pet.sex || !pet.birthdate) {
            toast.error("Por favor completa todos los campos obligatorios.");
            return;
        }

        const formData = new FormData();

        formData.append("petname", pet.petname);
        formData.append("species", pet.species);
        formData.append("breed", pet.breed || "Mestizo");
        formData.append("sex", pet.sex);
        formData.append("birthdate", pet.birthdate);
        if (pet.image) {
            formData.append("image", pet.image);
        }
        formData.append("description", pet.description || "");

        try {
            const response = await fetch(`${url}/api/petregister`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Mascota registrada con éxito.");
                setPet(initialPet);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                toast.error(data.message || "Error al registrar la mascota.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error inesperado, intente de nuevo más tarde.");
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="container-fluid justify-content-center mt-5 p-3 p-md-5">
                <div className="row mt-3 mt-md-5 justify-content-center">
                    <div className="col-12 col-lg-8 bg-white p-3 p-md-5 rounded-5 mb-4 mb-lg-0">
                        <h1 className="text-center pet-register_form-title">Registra una Nueva Mascota</h1>
                        <form onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="forPetName" className="form-label">Nombre <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Firulais"
                                            id="forPetName"
                                            name="petname"
                                            onChange={handleChange}
                                            value={pet.petname}
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forSpecies" className="form-label">Especie <span className="text-danger">*</span></label>
                                        <select
                                            onChange={handleChange}
                                            value={pet.species}
                                            className="form-control"
                                            name="species"
                                            id="forSpecies"
                                            required
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
                                            placeholder="Mestizo"
                                            id="forBreed"
                                            name="breed"
                                            onChange={handleChange}
                                            value={pet.breed}
                                        />
                                    </div>

                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="forSex" className="form-label">Sexo <span className="text-danger">*</span></label>
                                        <select
                                            className="form-control"
                                            name="sex"
                                            id="forSex"
                                            onChange={handleChange}
                                            value={pet.sex}
                                            required
                                        >
                                            <option value="">Elige...</option>
                                            <option value="MALE">Macho</option>
                                            <option value="FEMALE">Hembra</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forBirthdate" className="form-label">Fecha de Nacimiento <span className="text-danger">*</span></label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="forBirthdate"
                                            name="birthdate"
                                            onChange={handleChange}
                                            value={pet.birthdate}
                                            required
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
                            <button type="submit" className="boton-registro btn w-100 mt-3 rounded-5">Registrar Mascota</button>
                        </form>
                    </div>
                    <div className="col-12 col-lg-4 justify-content-center align-items-center d-flex">
                        <div className="d-flex flex-column align-items-center" style={{ maxWidth: "350px", width: "100%" }}>
                            <div className="w-100">
                                <img src="https://www.nicepng.com/png/full/1-15541_cat-png-cat-png.png" alt="Preview" className="img-fluid mb-3 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}