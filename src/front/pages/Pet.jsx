import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "../components/Spinner.jsx";


export const Pet = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pet/${petId}`);

                if (response.ok) {
                    const data = await response.json();
                    setPet(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [petId]);

    const calculateAge = () => {

        const birthDate = new Date(pet.birthdate);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (years === 0) {
            return months === 1 ? "1 mes" : `${months} meses`;
        } else if (years === 1) {
            return months === 0 ? "1 año" : `1 año y ${months} ${months === 1 ? 'mes' : 'meses'}`;
        } else {
            return months === 0 ? `${years} años` : `${years} años y ${months} ${months === 1 ? 'mes' : 'meses'}`;
        }
    };

    const getSexIcon = () => {
        if (pet.sex === 'Macho') {
            return <i className="fa-solid fa-mars pet_sex-icon me-2" style={{ color: '#4A90E2' }}></i>;
        } else if (pet.sex === 'Hembra') {
            return <i className="fa-solid fa-venus pet_sex-icon me-2" style={{ color: '#E91E63' }}></i>;
        }
        return null
    };

    const getPetSpecies = () => {
        if (pet.species === 'Perro') {
            return <i className="fa-solid fa-dog ms-2"></i>;
        }
        else if (pet.species === 'Gato') {
            return <i className="fa-solid fa-cat ms-2"></i>;
        }
        else if (pet.species === 'Otro') {
            return <i className="fa-solid fa-paw ms-2"></i>;
        }
    }

    if (loading) {
        return <Spinner />
    }


    if (!pet) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    Mascota no encontrada
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">

            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img
                            src={pet.image}
                            className="img-fluid rounded-start h-100 object-fit-cover"
                            alt={pet.name}
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body p-4">
                            <h1 className="card-title display-4 mb-4">
                                {pet.name}
                                {getPetSpecies()}
                            </h1>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">
                                    <i className="fas fa-birthday-cake me-2"></i>
                                    Edad
                                </h5>
                                <p className="fs-5 ms-4">{calculateAge(pet.birthdate)}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">
                                    {getSexIcon()}
                                    Sexo
                                </h5>
                                <p className="fs-5 ms-4">{pet.sex}</p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Raza
                                </h5>
                                <p className="fs-6 ms-4" >
                                    {pet.breed}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h5 className="text-muted mb-2">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Descripción
                                </h5>
                                <p className="fs-6 ms-4" >
                                    {pet.description}
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    className="btn btn-light btn-lg"
                                    onClick={() => navigate('/pets')}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Volver a Mascotas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}