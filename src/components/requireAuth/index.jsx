import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATH } from "~/constants/Paths";

const RequireAuth = () => {

    const user = useSelector((state) => state.auth?.currentUser);
    const location = useLocation();

    return (
        user?.accessToken
            ? <Outlet />
            : <Navigate to={PATH.LOGIN} state={{ from: location }} replace />
    );
}

export default RequireAuth;