import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner.jsx";
import "../styles/components/petManagement.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_BACKEND_URL;

export const PetManagent = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(`${url}/api/pets`);
                if (response.ok) {
                    const data = await response.json();
                    setPets(data);
                }
            } catch (error) {
                console.error("Error al cargar las mascotas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const goToEdit = (petId) => {
        navigate(`/dashboard/petedit/${petId}`);
    };



    const handleDelete = async (petId) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${url}/api/pet/${petId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setPets(pets.filter(pet => pet.id !== petId));
                    Swal.fire({
                        title: "¡Eliminada!",
                        text: "La mascota ha sido eliminada exitosamente.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Error al eliminar la mascota",
                        icon: "error"
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Error al eliminar la mascota",
                    icon: "error"
                });
            }
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="container mt-4">
            <table className="table pet-management-table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Sexo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.length > 0 ? (
                        pets.map((pet) => (
                            <tr key={pet.id}>
                                <td>{pet.name}</td>
                                <td>{pet.species}</td>
                                <td>{pet.sex}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={() => goToEdit(pet.id)}
                                    >
                                        <i className="bi bi-pencil-fill"></i> Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(pet.id)}
                                    >
                                        <i className="bi bi-trash-fill"></i> Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay mascotas registradas</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}