import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    let token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
        return true;
    }
    return false;
}

const ProtectedRoute = () => {
    return (
        <>
            {useAuth() ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}

export default ProtectedRoute