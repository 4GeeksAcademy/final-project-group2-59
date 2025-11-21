export default function DonationVoucher({ donation }) {
    if (!donation) return null;

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card shadow-lg border-0" style={{ maxWidth: "480px", borderRadius: "20px" }}>
                <div className="card-body p-4">

                    {/* Header */}
                    <div className="text-center mb-4">
                        <div
                            className="bg-success text-white rounded-circle d-flex justify-content-center align-items-center"
                            style={{
                                width: "70px",
                                height: "70px",
                                margin: "auto",
                                fontSize: "35px",
                            }}
                        >
                            ✓
                        </div>

                        <h3 className="mt-3 fw-bold">Gracias por tu Donación</h3>
                        <p className="text-muted">Tu aporte hace la diferencia</p>
                    </div>

                    <hr />

                    {/* Datos */}
                    <div className="mb-2">
                        <p className="mb-1 fw-bold">Nombre:</p>
                        <p className="text-muted">{donation.name || "Anónimo"}</p>
                    </div>

                    <div className="mb-2">
                        <p className="mb-1 fw-bold">Correo:</p>
                        <p className="text-muted">{donation.email || "No informado"}</p>
                    </div>

                    <div className="mb-2">
                        <p className="mb-1 fw-bold">Monto donado:</p>
                        <p className="text-success fw-bold" style={{ fontSize: "1.3rem" }}>
                            USD {donation.amount}
                        </p>
                    </div>

                    <div className="mb-2">
                        <p className="mb-1 fw-bold">ID de Transacción:</p>
                        <p className="text-muted">{donation.transaction_number}</p>
                    </div>

                    <div className="mb-4">
                        <p className="mb-1 fw-bold">Fecha:</p>
                        <p className="text-muted">
                            {new Date(donation.created_at).toLocaleString()}
                        </p>
                    </div>

                    <hr />

                    <p className="text-center text-muted fst-italic">
                        Este comprobante certifica tu aporte voluntario.
                    </p>
                </div>
            </div>
        </div>
    );
}
