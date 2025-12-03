import React, { useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../../front/styles/pages/donations.css";
import { DogCard } from "../components/DonationCard.jsx";
import { Spinner } from "../components/Spinner.jsx";

let API_URL = "https://fictional-winner-59p6pwq7694fpxgq-3001.app.github.dev/";

export const Donations = () => {
    const formRef = useRef(null);
    const { store, dispatch } = useGlobalReducer();
    const [showSpinner, setShowSpinner] = useState(false);


    const dogCardsColumn = [
        { rotate: "rotate-1", img: "src/front/pages/img/perro1.jpg", text: "Rocco necesita medicinas para su artritis." },
        { rotate: "rotate-2", img: "src/front/pages/img/perro2.jpg", text: "Misha necesita una cama cálida para los días fríos." },
    ];

    const dogCardsColumn2 = [
        { rotate: "rotate-3", img: "src/front/pages/img/perro3.jpg", text: "Luna necesita vacunas para mantenerse saludable." },
        { rotate: "rotate-4", img: "src/front/pages/img/perro4.jpg", text: "Toby necesita juguetes para estimular su mente y energía." },
    ];

    const dogCardsColumn3 = [
        { rotate: "rotate-3", img: "src/front/pages/img/perro5.jpg", text: "Bella necesita transporte seguro para ir al veterinario." },
        { rotate: "rotate-4", img: "src/front/pages/img/perro6.jpg", text: "Simba necesita ropa especial por su piel sensible." },
    ];


    const [form, setForm] = useState({
        name: "",
        email: "",
        amount: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formRef.current.reportValidity()) return;

        sessionStorage.setItem("donationForm", JSON.stringify(form));
        setShowSpinner(true);
        createOrder();
    };

    const createOrder = async () => {
        try {
            const response = await fetch(`${API_URL}api/donations/create-paypal-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: form.amount,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Error creando orden:", data);
                return;
            }

            const approveLink = data.links?.find((link) => link.rel === "approve");

            if (!approveLink) {
                console.error("No llegó link de aprobación");
                return;
            }
            window.location.href = approveLink.href;
            setShowSpinner(false);

        } catch (error) {
            console.error("Error creando orden:", error);
        }

    };


    return (
        <div className="container d-flex justify-content-center">
            {showSpinner && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50"
                    style={{ zIndex: 9999 }}
                >
                    <Spinner />
                </div>
            )}
            <div className="row">
                <div className="col-2 d-none d-md-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img} text={c.text} />))}
                </div>
                <div className="col-2 d-none d-md-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn2.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img}
                            text={c.text} />))}
                </div>
                <div className="col-2 d-none d-md-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn3.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img}
                            text={c.text} />))}
                </div>
                <div className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end">
                    <div className="card card-donations bg-white p-4 rounded shadow mt-5">
                        <div className="card-body">
                            <h5 className="logo-text text-center">Donar</h5>

                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        name="name"
                                        type="text"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={store.user?.full_name || form.name}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={store.user?.email || form.email}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Monto USD</label>
                                    <input
                                        name="amount"
                                        type="number"
                                        className="form-control"
                                        required
                                        onChange={handleChange}
                                        value={form.amount}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mensaje (opcional)</label>
                                    <textarea
                                        name="message"
                                        rows="3"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={form.message}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-donations w-100">
                                    Donar ahora
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
