import { headers } from "~/api/AxiosClient";
import { PATH_API, PATH_MATCH } from "~/constants/Paths";


export const couponMatchName = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.COUPONS + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_NAME + value
        : PATH_MATCH.UPDATE_MATCH_CODE + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}


export const couponMatchCode = async (value, params, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.COUPONS + (params === null || params === undefined
        ? PATH_MATCH.ADD_MATCH_CODE + value
        : PATH_MATCH.UPDATE_MATCH_CODE + params + "/" + value);

    try {
        const res = await axiosJwt.get(url, headers(accesToken))
        return res?.data;
    } catch (error) {
        dispatch("/login")
    }
}