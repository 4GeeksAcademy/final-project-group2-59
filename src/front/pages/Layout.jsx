import { Outlet } from "react-router-dom/dist"
import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

const backendUrl = import.meta.env.VITE_BACKEND_URL

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        const loadUserData = async () => {
            const token = localStorage.getItem("token")
            const userData = localStorage.getItem("user")

            if (token && userData) {
                try {
                    dispatch({ type: "SET_TOKEN", payload: token })
                    dispatch({ type: "SET_USER", payload: JSON.parse(userData) })

                    const favoritesResponse = await fetch(`${backendUrl}/api/favorites`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })

                    if (favoritesResponse.ok) {
                        const favoritesData = await favoritesResponse.json()
                        dispatch({
                            type: "SET_FAVORITES",
                            payload: favoritesData.favorites
                        })
                    }
                } catch (error) {
                    console.error("Error al cargar datos del usuario:", error)
                }
            }
        }

        loadUserData()
    }, [])

    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    )
}