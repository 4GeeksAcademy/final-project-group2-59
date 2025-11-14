import React from "react";
import styles from "../petRegister.css"

export const PetRegister = () => {
    return (
        <>
            <div className="container-fluid justify-content-center mt-5 mb-5 p-5">
                <div className="row mt-5">
                    <div className="col-8 bg-white p-5 rounded-5">
                        <h1 className="text-center form-title">Registra una Nueva Mascota</h1>
                        <form>
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
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forSpecies" className="form-label">Especie</label>
                                        <select
                                            className="form-control"
                                            name="species"
                                            id="forSpecies"
                                        >
                                            <option value="">Elige...</option>
                                            <option value="Dog">Perro</option>
                                            <option value="Cat">Gato</option>
                                            <option value="Other">Otro</option>
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
                                        >
                                            <option value="">Elige...</option>
                                            <option value="Male">Macho</option>
                                            <option value="Female">Hembra</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forBirthdate" className="form-label">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="forBirthdate"
                                            name="birthdate"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="forImage" className="form-label">Foto</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="forImage"
                                            name="image"
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description" className="form-label">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-4 justify-content-center align-item-center border border-danger d-flex">
                        <div className="d-flex flex-column aling-items-end" style={{maxWidth: "350px"}}>
                            <div className="">
                                <img src="https://www.nicepng.com/png/full/1-15541_cat-png-cat-png.png" alt="Preview" className="img-fluid mb-3" />
                            </div>
                            <div className="">
                                <button type="submit" className="btn btn-primary w-100">Registrar Mascota</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}