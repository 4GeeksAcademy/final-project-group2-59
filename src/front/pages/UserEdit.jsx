import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

export const UserEdit = () => {

    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [userEdited, setUserEdited] = useState({})

    const getUser = async () => {
        try {
            const response = await fetch(`${url}/api/users`)

            if (response.ok) {
                const data = await response.json()

                let edit = data.find((item) => item.id == userId)
                setUser(edit)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    })

    const handleChange = ({target}) => {
        
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <form className="bg-light">
                        <div className="form-group">
                            <label htmlFor="theRole">Role</label>
                            <select
                                name="role"
                                id="forRole"
                                value={user.status}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                                <option value="Baneado">Baneado</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}