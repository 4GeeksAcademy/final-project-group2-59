import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import "../styles/pages/users.css"
import { Toaster, toast } from "sonner";
import { Spinner } from "../components/Spinner";

const url = import.meta.env.VITE_BACKEND_URL;

export const UserEdit = () => {

    const { userId } = useParams()
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState("")
    const [loading, setLoading] = useState(true)

    const getUser = async () => {
        try {
            const response = await fetch(`${url}/api/users`)

            if (response.ok) {
                const data = await response.json()

                let edit = data.find((item) => item.id == userId)

                const ROLE = {
                    "Admin": "ADMIN",
                    "Usuario": "USER"
                }
                const STATUS = {
                    "Activo": "ACTIVE",
                    "Inactivo": "INACTIVE",
                    "Baneado": "BANNED"
                }

                setUser({
                    full_name: edit.full_name,
                    role: ROLE[edit.role] || "",
                    status: STATUS[edit.status] || ""
                })
                setAvatar(edit.avatar)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [userId])

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(user.status)

        try {
            const response = await fetch(`${url}/api/user/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            })

            if(response.ok){
                toast.success("Se actualizaron los datos de forma exitosa")
                setTimeout(() => {
                    navigate("/dashboard/users")
                }, 3000);
            } else {
                toast.error("Ocurrio un error al actualizar los datos")
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Spinner />
    }


    return (
        <div className="container">
            <Toaster position="top-center"/>
            <div className="row mt-5">
                <div className="col-6">
                    <form className="form-editUser bg-light p-5 rounded-5" onSubmit={handleSubmit}>
                        <h3 className="mt-5">Usuario: {user.full_name}</h3>
                        <div className="form-group mb-3">
                            <label htmlFor="forRole">Role</label>
                            <select
                                name="role"
                                id="forRole"
                                value={user.role}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="ADMIN">Admin</option>
                                <option value="USER">User</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forStatus">Status</label>
                            <select
                                name="status"
                                id="forStatus"
                                value={user.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="ACTIVE">Activo</option>
                                <option value="INACTIVE">Inactivo</option>
                                <option value="BANNED">Baneado</option>
                            </select>
                        </div>
                        <button className="guardar-userEdit btn col-12">Guardar</button>
                    </form>
                </div>
                <div className="col-6 d-flex justify-content-center">
                    <img className="img-fluid rounded-circle" src={avatar} alt="avatar" />
                </div>
            </div>
        </div>
    )
}