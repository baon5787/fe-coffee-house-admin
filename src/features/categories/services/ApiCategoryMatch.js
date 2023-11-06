import { headers } from "~/api/AxiosClient";
import { PATH, PATH_MATCH } from "~/constants/Paths";
import { isParam } from "~/utils/CheckValue";

export const categoryMatchName = async (value, params, accessToken, dispatch, axiosJwt) => {

    const url = PATH.CATEGORIES + (isParam(params)
        ? PATH_MATCH.UPDATE_MATCH_NAME + params + "/" + value
        : PATH_MATCH.ADD_MATCH_NAME + value);

    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}


export const categoryMatchCode = async (value, params, accessToken, dispatch, axiosJwt) => {

    const url = PATH.CATEGORIES + (isParam(params)
        ? PATH_MATCH.UPDATE_MATCH_CODE + params + "/" + value
        : PATH_MATCH.ADD_MATCH_CODE + value);

    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}