import { headers } from "~/api/AxiosClient";
import { PATH, PATH_MATCH } from "~/constants/Paths";

export const categoryMatchName = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH.CATEGORIES + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_NAME + value
        : PATH_MATCH.UPDATE_MATCH_NAME + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}


export const categoryMatchCode = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH.CATEGORIES + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_CODE + value
        : PATH_MATCH.UPDATE_MATCH_CODE + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}