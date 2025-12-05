import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DonationVoucher from "../components/DonationVoucher";
import { Spinner } from "../components/Spinner.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";


let API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Success() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const { store } = useGlobalReducer();
    const [donation, setDonation] = useState(null);
    const hasRun = useRef(false);

    const formData = JSON.parse(sessionStorage.getItem("donationForm")) || {};

    const capturePayment = async () => {
        const response = await fetch(`${API_URL}/api/donations/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error("Capture failed: " + error);
        }

        return await response.json();
    };

    const registerPayment = async (paypalData, store) => {
        const response = await fetch(`${API_URL}/api/donations/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name:
                    store.user?.full_name ||
                    formData.name?.trim() ||
                    paypalData.payer_name ||
                    "anonymous",

                email:
                    store.user?.email ||
                    formData.email?.trim() ||
                    paypalData.payer_email,

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

            if (hasRun.current) return;
            hasRun.current = true;

            try {
                const paypalData = await capturePayment();
                const saved = await registerPayment(paypalData, store);

                setDonation(saved.donation);
            } catch (error) {
                console.error("Error procesando donación:", error);
            }
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
