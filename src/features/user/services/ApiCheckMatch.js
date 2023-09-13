import { headers } from "~/api/AxiosClient";
import { PATH_API, PATH_MATCH } from "~/constants/Paths";

export const addUserMatchEmail = async (value, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.USERS + PATH_MATCH.ADD_MATCH_EMAIL + value

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}

export const addUserMatchPhone = async (value, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.USERS + PATH_MATCH.ADD_MATCH_PHONE + value

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}

export const updateUserMatchPhone = async (params, value, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.USERS + PATH_MATCH.UPDATE_MATCH_PHONE + params + '/' + value

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}