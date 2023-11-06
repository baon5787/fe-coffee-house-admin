import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useBase = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return {
        dispatch,
        navigate,
        location
    }
}

export default useBase