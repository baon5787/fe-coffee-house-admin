import { axiosClient } from "~/api/AxiosClient";
import { PATH, PATH_API } from "~/constants/Paths";
import { loginFailed, loginStart, loginSucces } from "~/redux/slice/AuthSlice";

export const loginUser = async (data, dispatch, navigate) => {
    const user = JSON.stringify(data);
    dispatch(loginStart());
    try {
        const res = await axiosClient.post(PATH_API.LOGIN, user, { withCredentials: true });
        dispatch((loginSucces(res.data)));
        navigate(`/${PATH.PRODUCTS}`);
    } catch (error) {
        dispatch(loginFailed('a'))
    }
}