import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DonationVoucher from "../components/DonationVoucher";
import { Spinner } from "../components/Spinner.jsx";




let API_URL = "https://fictional-winner-59p6pwq7694fpxgq-3001.app.github.dev/";

export default function Success() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);

    const formData = JSON.parse(sessionStorage.getItem("donationForm")) || {};

    // --- Animación de puntos ---
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length < 3 ? prev + "." : ""));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const capturePayment = async () => {
        const response = await fetch(`${API_URL}api/donations/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });

        return await response.json();
    };

    const registerPayment = async (paypalData) => {
        const response = await fetch(`${API_URL}api/donations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name?.trim() || paypalData.payer_name || "anonymous",
                email: formData.email?.trim() || paypalData.payer_email,
                amount: paypalData.amount,
                transaction_number: paypalData.capture_id,
                message: formData.message?.trim() || null
            })
        });

        return await response.json();
    };

    useEffect(() => {
        const process = async () => {
            if (!token) return;

            const paypalData = await capturePayment();
            const saved = await registerPayment(paypalData);

            setDonation(saved.donation);
        };
        process();
    }, [token]);

    return (
        <div className="mt-4">
            {donation ? (
                <DonationVoucher donation={donation} />
            ) : (
                <h3 className="text-center mt-5">
                    <Spinner />
                </h3>
            )}
        </div>
    );
}
