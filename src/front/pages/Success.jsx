import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let API_URL = "https://fictional-winner-59p6pwq7694fpxgq-3001.app.github.dev/";

export default function Success() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const formData = JSON.parse(sessionStorage.getItem("donationForm"));

    const [paypalData, setPaypalData] = useState(null);

    // 1) Captura el pago en PayPal
    const capturePayment = async (token) => {
        try {
            const response = await fetch(`${API_URL}api/donations/capture`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token })
            });

            if (!response.ok) {
                console.error("PAYPAL CAPTURE RESPONSE:", response);
                return null;
            }

            const data = await response.json();
            console.log("PAYPAL CAPTURE:", data);
            return data;

        } catch (error) {
            console.error("Error capturando el pago:", error);
            return null;
        }
    };

    // 2) Registra en BD
    const registerPayment = async (formData, paypalData) => {
        try {
            const response = await fetch(`${API_URL}api/donations/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData?.name || paypalData?.payer_name || "anonymous",
                    email: formData?.email || paypalData?.payer_email || null,
                    amount: paypalData?.amount,
                    transaction_number: paypalData?.capture_id,  // <-- EL REAL
                    message: formData?.message || null
                })
            });

            const result = await response.json();
            console.log("PAGO REGISTRADO EN BD:", result);

        } catch (error) {
            console.error("Error registrando pago:", error);
        }
    };

    useEffect(() => {
        const process = async () => {
            if (!token) return;

            const paypalResponse = await capturePayment(token);

            if (!paypalResponse) {
                console.error("Pago no completado");
                return;
            }

            setPaypalData(paypalResponse);

            await registerPayment(formData, paypalResponse);
        };

        process();
    }, [token]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center m-5">
            <h1>Pago realizado con éxito 🎉</h1>
            <p>Gracias por tu donación</p>
        </div>
    );
}
