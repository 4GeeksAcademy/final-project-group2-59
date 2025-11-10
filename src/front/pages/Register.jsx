import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"

const initialUser = {
    fullname: "",
    email: "",
    birthdate: "",
    gender: "",
    avatar: null,
    password: ""
}

const url = import.meta.env.VITE_BACKEND_URL

export const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(initialUser)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState({})
    const fileInputRef = useRef(null)

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleConfirmChange = ({target}) => {
        setConfirmPassword(target.value)

        if (user.password && target.value !== user.password) {
            setError((prev) => ({
                ...prev,
                confirm: "Passwords don't match"
            }))
        } else {
            setError(prev => ({
                ...prev,
                confirm: null
            }))
        }
    }

    const handleFileChange = ({target}) => {
        const file = target.files[0]

        setUser({
            ...user,
            avatar: file
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        if (user.password !== confirmPassword) {
            setError((prev) => ({
                ...prev,
                confirm: "Passwords don't match"
            }))

            return
        }

        const formData = new FormData()
        formData.append("fullname", user.fullname)
        formData.append("email", user.email)
        formData.append("birthdate", user.birthdate)
        formData.append("gender", user.gender)
        formData.append("password", user.password)
        formData.append("avatar", user.avatar)

        const response = await fetch(`${url}api/register`, {
            method: "POST",
            body: formData
        })
        
        if (response.ok){
            setUser(initialUser)
            fileInputRef.current.value = null

            navigate("/")

        } else if (response.status == 409) {
            toast.error("User Already exist")
        } else {
            toast.error("Error creating user, please try again")
        }

    }

    return (
        <div className="container vh-100 d-flex flex-column mt-5">
            <Toaster position="top-center" />
            <div className="row justify-content-center">
                <h1 className="text-center mb-4">Register</h1>
                <div className="col-12 col-md-6">
                    <form
                        className="border-top border-bottom border-secondary p-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="forName" className="form-label">Full Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="forName"
                                placeholder="Daniel Novas"
                                name="fullname"
                                onChange={handleChange}
                                value={user.fullname}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forEmail">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="forEmail"
                                placeholder="example@email.com"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forBirthdate">Birthdate:</label>
                            <input 
                                type="date" 
                                className="form-control"
                                id="forBirthdate"
                                name="birthdate"
                                onChange={handleChange}
                                value={user.birthdate}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forGender">Gender:</label>
                            <select
                                onChange={handleChange} 
                                className="form-control" 
                                name="gender" 
                                id="forGender"
                                value={user.gender}
                            >
                                <option value="">Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forAvatar">Avatar</label>
                            <input 
                                type="file"
                                className="form-control"
                                id="forAvatar"
                                placeholder="Avatar"
                                name="avatar"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forPassword">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="forPassword"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forConfirmPassword">Confirm password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="forConfirmPassword"
                                placeholder="Confirm password"
                                name="password"
                                onChange={handleConfirmChange}
                                value={confirmPassword}
                            />
                            {
                                error.confirm && <div className="text-danger mt-2">{error.confirm}</div>
                            }
                        </div>
                        <button className="btn btn-outline-primary col-12">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}