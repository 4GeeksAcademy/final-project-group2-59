import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { Navigate } from "react-router-dom";

export const Protectedadmin = ({ children }) => {
    const { store } = useGlobalReducer();
    console.log("role", store?.user?.role)

    if (!store?.token || store?.user?.role !== "Admin") {
        return <Navigate to="/" />;
    }

    return children;
}