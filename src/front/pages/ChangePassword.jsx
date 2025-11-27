import { useState, useRef } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Link } from "react-router-dom";


const backendUrl = import.meta.env.VITE_BACKEND_URL

export const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState({
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState({})
    const [searchParams, _] = useSearchParams()

    const handleChange = ({target}) => {
        setNewPassword({
            [target.name]: target.value
        })
    }

    const handleConfirmChange = ({ target }) => {
        setConfirmPassword(target.value);

        if (newPassword.password && target.value !== newPassword.password) {
            setError((prev) => ({
                ...prev,
                confirm: "Las contraseñas no coinciden",
            }));
        } else {
            setError((prev) => ({
                ...prev,
                confirm: null,
            }));
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`${backendUrl}/api/change-password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${searchParams.get("token")}`,
                    "Content-type": "application/json"
                },

                body: JSON.stringify(newPassword)
            })

            if (response.ok) {
                toast.success("Contraseña actualizada con exito")
                setTimeout(()=>{
                    Navigate("login")
                }, 2000)
            }
        } catch (error) {
            console.log("error")
        }

    }

    return (

        <div className="container">
            <Toaster position="top-center"/>
            <div className="form-group">
                <form className="bg-light p-5" onSubmit={handleSubmit}>
                    <h1>Ingresa una contraseña nueva</h1>
                    <div className="form-group mb-3">
                        <label htmlFor="forPassword">Contraseñas:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="forPassword"
                            placeholder="contraseñas"
                            name="password"
                            onChange={handleChange}
                            value={newPassword.password}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="forConfirmPassword">
                            Confirmar contraseñas:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="forConfirmPassword"
                            placeholder="Confirm password"
                            name="password"
                            onChange={handleConfirmChange}
                            value={confirmPassword}
                        />
                        {error.confirm && (
                            <div className="text-danger mt-2">{error.confirm}</div>
                        )}
                    </div>
                    <button className="btn">Confirmar</button>
                </form>
            </div>
        </div>
    )
}