import { useState, useEffect } from "react";

let API_URL = "https://fictional-winner-59p6pwq7694fpxgq-3001.app.github.dev/";

export const Profile = () => {
    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Editar Usuario</h4>
                </div>

                <div className="card-body">
                    <form >

                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="birthday"
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Género</label>
                            <select
                                name="gender"
                                className="form-select"
                            >
                                <option value="">Seleccione...</option>
                                <option value="male">Hombre</option>
                                <option value="female">Mujer</option>
                                <option value="other">Otro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Avatar / Imagen</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                            />
                        </div>



                        <button type="submit" className="btn btn-primary w-100">
                            Guardar Cambios
                        </button>
                    </form>

                    <div className="alert alert-info mt-3 text-center">
                    </div>

                </div>
            </div>
        </div>
    );
}
