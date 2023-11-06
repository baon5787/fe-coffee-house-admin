import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "~/api/AxiosClient";
import { userSelector } from "~/redux/selectors";
import { loginSuccess } from "~/redux/slice/AuthSlice";

const useJwt = () => {

    const user = useSelector(userSelector);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    let axiosJwt = createAxios(user, dispatch, loginSuccess, navigate);

    const accessToken = user?.accessToken;

    return {
        accessToken,
        dispatch,
        navigate,
        axiosJwt
    }
}

export default useJwt;