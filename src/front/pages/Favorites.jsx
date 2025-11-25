import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { PetCard } from "../components/PetCard";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

export const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();
    const [favoritePets, setFavoritePets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
            return;
        }

        const loadFavorites = async () => {
            try {
                // Obtener IDs de favoritos
                const favResponse = await fetch(`${url}/api/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });

                if (favResponse.ok) {
                    const favData = await favResponse.json();
                    dispatch({ type: 'SET_FAVORITES', payload: favData.favorites });

                    const petsResponse = await fetch(`${url}/api/pets`);
                    if (petsResponse.ok) {
                        const allPets = await petsResponse.json();
                        const favPets = allPets.filter(pet => favData.favorites.includes(pet.id));
                        setFavoritePets(favPets);
                    }
                }
            } catch (error) {
                console.error("Error al cargar favoritos:", error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [store.token]);


    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="d-flex justify-content-center p-5">
                <h1 className="text-dark logo-text pets_title">FAVORITOS</h1>
            </div>
            <div className="container text-center">
                {
                    favoritePets.length === 0 ? (
                        <div className="text-center p-5">
                            <h2 className="text-dark">No tienes mascotas favoritas aún.</h2>
                        </div>
                    ) : (
                        <div className="row">
                            {favoritePets.map((pet) => (
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