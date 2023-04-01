import { loginStart, loginSucces, loginFailed, logoutStart, logoutSucces, logoutFailed } from "~/redux/authSlice"
import { instance } from '~/createInstance'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = instance.post('/api/admin/auth/login', user, { withCredentials: true });
        console.log((await res).data);
        dispatch((loginSucces((await res).data)));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed())
    }
}

export const logOut = async (dispatch, navigate, accesToken, axiosJwt) => {
    dispatch(logoutStart());
    try {
        await axiosJwt.post("/api/admin/auth/logout", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        });
        dispatch(logoutSucces());
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed());
    }
}
