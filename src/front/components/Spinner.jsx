import React from "react";
import "../styles/components/spinner.css";

export const Spinner = () => {
    return (
        <div className="container mt-5 text-center">
            <div className="paw-spinner">
                <i className="fa-solid fa-paw"></i>
            </div>
            <p className="mt-3 text-muted">Cargando...</p>
        </div>
    );
};
