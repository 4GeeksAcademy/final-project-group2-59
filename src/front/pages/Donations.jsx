import React, { useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../../front/donations.css";
import backUrl from "../assets/img/Donations_backgrounf.png";

export const Donations = () => {
    const formRef = useRef(null);
    const { store, dispatch } = useGlobalReducer();
    const [form, setForm] = useState({
        name: "",
        email: "",
        amount: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formRef.current.reportValidity()) return;

        window.location.href =
            "https://www.paypal.com/donate/?business=SF65VYCC55Q22&no_recurring=0&item_name=Recaudamos+dinero+para+ir+en+ayuda+de+los+animales+sin+hogar&currency_code=USD";
    };

    return (
        <div className="donations-bg d-flex align-items-center justify-content-end ">
            <img src={backUrl} className="donations-bg-img" />
            <div
                className="card card-donations bg-white p-4 rounded shadow me-4 me-md-5"
            >
                <div className="card-body">
                    <h5 className="card-title text-center mb-3">Donar</h5>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre completo</label>
                            <input name="name" type="text" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo electrónico</label>
                            <input name="email" type="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono (opcional)</label>
                            <input name="phone" type="text" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje (opcional)</label>
                            <textarea name="message" rows="3" className="form-control"></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-donations w-100"
                        >
                            Donar ahora
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
