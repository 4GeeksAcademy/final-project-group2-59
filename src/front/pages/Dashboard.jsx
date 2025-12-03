import { useNavigate } from "react-router-dom";
import "../styles/components/dashboard.css";

export const Dashboard = () => {
    const navigate = useNavigate();

    const goToPetRegister = () => {
        navigate('/dashboard/petregister');
    }

    const goToPetManagement = () => {
        navigate('/dashboard/petmanagement');
    }

    const goToUsers = () => {
        navigate('/dashboard/users')
    }


    return (
        <div className="vh-100 container d-flex justify-content-center align-items-center">
            <button className="btn dashboard_btn"
                onClick={goToUsers}
            >Administrar usuarios</button>
            <button className="btn dashboard_btn"
                onClick={goToPetRegister}
            >Registrar mascota</button>
            <button className="btn dashboard_btn"
                onClick={goToPetManagement}
            >Administrar mascotas</button>
        </div>
    );
}