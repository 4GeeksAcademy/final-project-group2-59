import React, { useState, useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../../front/styles/pages/donations.css";
import { DogCard } from "../components/DonationCard.jsx";

let API_URL = "https://fictional-winner-59p6pwq7694fpxgq-3001.app.github.dev/";

export const Donations = () => {
    const formRef = useRef(null);
    const { store, dispatch } = useGlobalReducer();

    const dogCardsColumn = [
        { rotate: "rotate-1", img: "src/front/pages/img/perro1.jpg" },
        { rotate: "rotate-2", img: "src/front/pages/img/perro2.jpg" },
    ];

    const dogCardsColumn2 = [
        { rotate: "rotate-3", img: "src/front/pages/img/perro3.jpg" },
        { rotate: "rotate-4", img: "src/front/pages/img/perro4.jpg" },
    ];

    const dogCardsColumn3 = [
        { rotate: "rotate-3", img: "src/front/pages/img/perro5.jpg" },
        { rotate: "rotate-4", img: "src/front/pages/img/perro6.jpg" },
    ];

    const cardText = "Roco necesita alimento especial por una alergia.";


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

        } catch (error) {
            console.error("Error creando orden:", error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-2 d-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img}
                            text={cardText}
                        />
                    ))}

                </div>
                <div className="col-2 d-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn2.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img}
                            text={cardText}
                        />
                    ))}


                </div>
                <div className="col-2 d-flex flex-column justify-content-center align-items-center mt-5 m-3">
                    {dogCardsColumn3.map((c, i) => (
                        <DogCard
                            key={i}
                            rotate={c.rotate}
                            img={c.img}
                            text={cardText}
                        />
                    ))}


                </div>
                <div className="col-5 d-flex justify-content-end">
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
