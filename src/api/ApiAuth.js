import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSucces } from '~/redux/slice/AuthSlice';
import { axiosClient } from './AxiosClient';

export const loginUser = async (data, dispatch, navigate) => {

    const user = JSON.stringify(data);

    dispatch(loginStart());
    try {
        const res = axiosClient.post('auth/login', user, { withCredentials: true });
        console.log((await res).data);
        dispatch((loginSuccess((await res).data)));
        navigate("/products");
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const logOut = async (dispatch, navigate, accesToken, axiosJwt) => {
    dispatch(logoutStart());
    try {
        await axiosJwt.post("auth/logout", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        });
        dispatch(logoutSucces());
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed());
    }
}
