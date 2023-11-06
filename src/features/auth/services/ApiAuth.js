import { axiosClient } from "~/api/AxiosClient";
import { HTTP_STATUS } from "~/constants/AppConstant";
import { PATH, PATH_API } from "~/constants/Paths";
import { loginFailed, loginStart, loginSuccess } from "~/redux/slice/AuthSlice";
import { setErrorForm } from "../validation/LoginValidation";

export const loginUser = async (data, dispatch, navigate, setError, setTitleError) => {
    const user = JSON.stringify(data);
    dispatch(loginStart());
    try {
        const res = await axiosClient.post(PATH_API.LOGIN, user, { withCredentials: true });
        dispatch((loginSuccess(res.data)));
        navigate(`${PATH.INDEX}${PATH.PRODUCTS}`);
    } catch (error) {
        const status = error?.response?.status;

        const data = error?.response?.data;

        if (status === HTTP_STATUS.BAD_REQUEST) {
            setErrorForm(data, setError);
        }

        if (status === HTTP_STATUS.UNAUTHORIZED) {
            setTitleError(data);
        }

        dispatch(loginFailed())
    }
}