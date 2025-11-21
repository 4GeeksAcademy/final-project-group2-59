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
        const formData = new FormData();


        formData.append("petname", pet.petname);
        console.log(pet.petname)
        formData.append("species", pet.species);
        formData.append("breed", pet.breed);
        formData.append("sex", pet.sex);
        formData.append("birthdate", pet.birthdate);
        formData.append("image", pet.image);
        formData.append("description", pet.description);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch(`${url}/api/petregister`, {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setPet(initialPet);
                fileInputRef.current.value = null;
                setTimeout(() => {
                    navigate("/pets");
                }, 2000);
                toast.success("Mascota registrada con éxito.");
            }
        } catch (error) {
            toast.error("Error inesperado, intente de nuevo más tarde.");
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <div className="container-fluid justify-content-center mt-5 p-5">
                <div className="row mt-5">
                    <div className="col-8 bg-white p-5 rounded-5">
                        <h1 className="text-center pet-register_form-title">Registra una Nueva Mascota</h1>
                        <form onSubmit={handleSubmit} >
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group mb-3">
                                        <label htmlFor="forPetName" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Firulais"
                                            id="forPetName"
                                            name="petname"
                                            onChange={handleChange}
                                            value={pet.petname}
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
                                            placeholder="Mestizo"
                                            id="forBreed"
                                            name="breed"
                                            onChange={handleChange}
                                            value={pet.breed}
                                        />
                                    </div>

                                </div>
                                <div className="col-6">
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
                    <div className="col-4 justify-content-center align-items-center  d-flex">
                        <div className="d-flex flex-column aling-items-end" style={{ maxWidth: "350px" }}>
                            <div className="">
                                <img src="https://www.nicepng.com/png/full/1-15541_cat-png-cat-png.png" alt="Preview" className="img-fluid mb-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}