import { headers } from "~/api/AxiosClient";
import { PATH, PATH_MATCH } from "~/constants/Paths";

export const productMatchName = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH.PRODUCTS + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_NAME + value
        : PATH_MATCH.UPDATE_MATCH_NAME + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}


export const productMatchSku = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH.PRODUCTS + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_SKU + value
        : PATH_MATCH.UPDATE_MATCH_SKU + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, headers(accesToken))
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}