import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../hooks/useGlobalReducer.jsx";

export const PrivateRoute = ({ children }) => {
    const { store } = useContext(Context);
    if (!store.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
        return children;
};