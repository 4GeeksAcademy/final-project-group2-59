import { useEffect, useState } from "react"

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
        const response = await fetch(`${url}/api/users`)

        if (response.ok) {
            const data = await response.json()

            setUsers(data)
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
                        <h1>No hay usuarios registrados</h1>
                    ) : (
                        <div className="row">
                            <h1 className="text-center mb-4">Usuarios</h1>
                            {
                                users.map((user) => (
                                    <div className="col-12 mb-4 bg-white border border-secondary rounded p-2 row" key={user.id}>
                                        <p className="mb-0 col-4">{user.full_name}</p>
                                        <div className="col-4">
                                            <select
                                                name="role"
                                                value={user.role}
                                                className="form-control"
                                            >
                                                <option value="Usuario">User</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select
                                                name="status"
                                                value={user.status}
                                                className="form-control"
                                            >
                                                <option value="Activo">Activo</option>
                                                <option value="Inactivo">Inactivo</option>
                                                <option value="Baneado">Baneado</option>
                                            </select>
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