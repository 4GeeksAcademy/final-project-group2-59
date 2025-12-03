import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const url = import.meta.env.VITE_BACKEND_URL;

export const PetCard = ({ pet }) => {
    const { store, dispatch } = useGlobalReducer();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const imageURL = pet.image;

    useEffect(() => {
        setIsFavorite(store.favorites.includes(pet.id));
    }, [store.favorites, pet.id]);

    const getSexIcon = () => {
        if (pet.sex === 'Macho') {
            return <i className="fa-solid fa-mars pets_sex-icon" style={{ color: '#4A90E2' }}></i>;
        } else if (pet.sex === 'Hembra') {
            return <i className="fa-solid fa-venus pets_sex-icon" style={{ color: '#E91E63' }}></i>;
        }
        return null
    };

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

    const handleFavoriteClick = async () => {
        if (!store.token) {
            alert("Debes iniciar sesión para agregar mascotas a favoritos");
            return;
        }

        if (isProcessing) return;

        setIsProcessing(true);

        try {
            if (isFavorite) {
                const response = await fetch(`${url}/api/favorites/${pet.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });

                if (response.ok) {
                    dispatch({ type: 'REMOVE_FAVORITE', payload: pet.id });
                } else {
                    console.error("Error al eliminar de favoritos");
                }
            } else {
                const response = await fetch(`${url}/api/favorites/${pet.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });

                if (response.ok) {
                    dispatch({ type: 'ADD_FAVORITE', payload: pet.id });
                } else if (response.status === 409) {
                    dispatch({ type: 'ADD_FAVORITE', payload: pet.id });
                } else {
                    console.error("Error al agregar a favoritos");
                }
            }
        } catch (error) {
            console.error("Error al actualizar favoritos:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <div className="card p-3" >
                    <img src={imageURL} className="card-img-top petcard_img" alt={pet.name} />
                    <div className="card-body">
                        <div className="pets_title-container">
                            <h2 className="card-title">{pet.name}</h2>
                            {getSexIcon()}
                        </div>
                        <h4>Edad: {calculateAge()}</h4>
                        <div className="d-flex justify-content-between mt-3 p-2">
                            <button
                                className={isFavorite ? "btn btn-danger" : "btn btn-outline-danger"}
                                type="button"
                                onClick={handleFavoriteClick}
                                disabled={isProcessing}
                            >
                                <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                            </button>
                            <Link to={`/pet/${pet.id}`} className="btn btn-light">Más sobre mi...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}