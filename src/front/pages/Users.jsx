import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../styles/pages/users.css"
import { Spinner } from "../components/Spinner";

const url = import.meta.env.VITE_BACKEND_URL;

export const Users = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const getUsers = async () => {
        try {
            const response = await fetch(`${url}/api/users`)

            if (response.ok) {
                const data = await response.json()

                setUsers(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    if (loading) {
        return <Spinner />
    }


    return (
        <div className="container">
            <div className="mt-4">
                {
                    users.length == 0 ? (
                        <h1 className="text-center">No hay usuarios registrados</h1>
                    ) : (
                        <div>
                            <h1 className="h1-users text-center mb-4">Usuarios</h1>
                            <table className="table table-users table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Edit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.full_name}</td>
                                                <td >{user.role}</td>
                                                <td>{user.status}</td>
                                                <td>
                                                    <Link to={`user/${user.id}`} className="btn btn-sm link-underline">
                                                        <i className="text-center bi bi-pencil-fill"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                }
            </div>
        </div>
    )
}