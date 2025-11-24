import "../../front/styles/pages/pets.css"
import { PetCard } from "../components/PetCard.jsx"
import React, { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner.jsx";

const url = import.meta.env.VITE_BACKEND_URL

export const Pets = () => {

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true); 

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

    if (loading) {
        return (
            <Spinner />
        );
    }

    return (
        <>
            <div className="d-flex justify-content-center p-5">
                <h1 className="text-dark logo-text pets_title">BUSCANDO FAMILIA</h1>
            </div>
            <div className="container text-center">
                {
                    pets.length === 0 ? (
                        <div className="text-center p-5">
                            <h2 className="text-dark">No hay mascotas disponibles</h2>
                        </div>
                    ) : (
                        <div className="row">
                            {pets.map((pet) => (
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4" key={pet.id}>
                                    <PetCard pet={pet} />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    );
}