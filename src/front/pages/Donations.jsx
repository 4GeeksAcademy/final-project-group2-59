import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../../front/index.css"

export const Donations = () => {

    const { store, dispatch } = useGlobalReducer()
    const [form, setForm] = useState({
        name: "",
        email: "",
        amount: "",
        message: "",
    });

    return (
        <div className=" donations">
            <div className="row w-100 h-100 align-items-center">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4 text-center text-md-start">
                    <div className="m-5 texto-hero text-white text-md-start d-flex flex-column justify-content-center align-items-center ">
                        <h1 className="text-center">Dales una segunda oportunidad</h1>
                        <p>En las calles hay cientos de perritos que solo conocen el frío, el hambre y la indiferencia.
                            Nosotros queremos cambiar eso.

                            Con tu ayuda podemos brindar refugio, alimento, atención veterinaria y, lo más importante, una vida digna llena de cariño.
                            Tu aporte, por pequeño que sea, puede ser la diferencia entre el abandono y un nuevo comienzo.</p>
                        <h2>Súmate</h2>
                        <p>Haz que hoy, la historia de uno más cambie para siempre.</p>
                    </div>
                </div>
                <div className="col-12 col-md-6 ">
                    <div className="card card-donations bg-white p-4 rounded shadow mx-auto w-100">
                        <div className="card-body">
                            <h5 className="card-title">Donar ahora</h5>
                            <p className="text-muted mb-3">Formulario seguro — datos mínimos para procesar tu aporte</p>

                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>
                                    <input name="name" type="text" className="form-control" required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Correo electrónico</label>
                                    <input name="email" type="email" className="form-control" required />
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col">
                                        <label className="form-label">Teléfono (opcional)</label>
                                        <input name="phone" type="text" className="form-control" />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">Frecuencia</label>
                                        <select name="freq" className="form-select">
                                            <option value="one">Única</option>
                                            <option value="monthly">Mensual</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="mb-1 text-muted">Elige un monto</div>

                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="amount" id="amt1" value="5000" />
                                            <label className="form-check-label" htmlFor="amt1">$5.000</label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="amount" id="amt2" value="10000" />
                                            <label className="form-check-label" htmlFor="amt2">$10.000</label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="amount" id="amt3" value="20000" />
                                            <label className="form-check-label" htmlFor="amt3">$20.000</label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="amount" id="amtCustom" value="custom" />
                                            <label className="form-check-label" htmlFor="amtCustom">Otro</label>
                                        </div>
                                    </div>

                                    <input
                                        type="number"
                                        name="customAmount"
                                        placeholder="Ingrese monto (CLP)"
                                        className="form-control"
                                        min="1000"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Mensaje (opcional)</label>
                                    <textarea name="message" rows="3" className="form-control"></textarea>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="agree" required />
                                    <label className="form-check-label" htmlFor="agree">Acepto el uso de mis datos para procesar la donación.</label>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">Donar ahora</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );


}


