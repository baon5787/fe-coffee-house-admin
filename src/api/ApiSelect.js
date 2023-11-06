import { PATH_API } from "~/constants/Paths";
import { headers } from "./AxiosClient";
import { setStatusesSucces } from "~/redux/slice/StatusSlice";
import { HTTP_STATUS, MSG_ERROR } from "~/constants/AppConstant";
import { swalMixinError } from "~/components/swal/Swal";

export const getSelectStatuses = async (accessToken, dispatch, axiosJwt) => {
    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.STATUSES,
            headers(accessToken));
        dispatch(setStatusesSucces(res?.data));
        return res.data;
    } catch (error) {
        const res = error?.response;

        if (res?.status === HTTP_STATUS.FORBIDDEN) {
            swalMixinError(MSG_ERROR.FORBIDDEN);
        }
    }
}

export const getSelectParentCategories = async (accessToken, axiosJwt, handleCloseModal) => {

    try {
        const res = await axiosJwt.get(PATH_API.CATEGORIES + PATH_API.PARENT + PATH_API.SELECT,
            headers(accessToken))
        return res.data;
    } catch (error) {
        const res = error?.response;

        if (res?.status === HTTP_STATUS.FORBIDDEN) {
            handleCloseModal();
            swalMixinError(MSG_ERROR.FORBIDDEN);
        }
    }
}

export const getSelectSubCategories = async (accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.CATEGORIES + PATH_API.SUB + PATH_API.SELECT,
            headers(accessToken));
        return res.data;
    } catch (error) {
        const res = error?.response;

        if (res?.status === HTTP_STATUS.FORBIDDEN) {
            swalMixinError(MSG_ERROR.FORBIDDEN);
        }
    }
}