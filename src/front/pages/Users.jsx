import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../styles/pages/users.css"

const url = import.meta.env.VITE_BACKEND_URL;

export const Users = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const response = await fetch(`${url}/api/users`)

            if (response.ok) {
                const data = await response.json()

                setUsers(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    })



    return (
        <div className="container">
            <div className="row mt-4">
                {
                    users.length == 0 ? (
                            <h1 className="text-center">No hay usuarios registrados</h1>
                    ) : (
                        <div className="row">
                            <h1 className="text-center mb-4">Usuarios</h1>
                            <div className="col-12 row mb-2">
                                <p className="mb-0 col-4">Username</p>
                                <p className="mb-0 me-5 col-3">Role</p>
                                <p className="mb-0 ms-4 col-3">Status</p>
                            </div>
                            {
                                users.map((user) => (
                                    <div className="col-12 mb-4 bg-white border border-secondary rounded p-2 row" key={user.id}>
                                        <p className="mb-0 col-4">{user.full_name}</p>
                                        <p className="mb-0 me-5 col-3 bg-light border rounded">{user.role}</p>
                                        <p className="mb-0 ms-4 col-3 bg-light border rounded">{user.status}</p>
                                        <div className="col-1 users-edit">
                                            <Link to={`user/${user.id}`}><i className="text-center bi bi-pencil-fill"></i></Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    )
                }
            </div>
        </div>
    )
}