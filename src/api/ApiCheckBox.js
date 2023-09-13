import { PATH_API } from "~/constants/Paths";
import { headers } from "./AxiosClient";

export const getCheckBoxSizes = async (accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.SIZES + PATH_API.CHECKBOX, headers(accessToken))
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCheckBoxRoles = async (accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.ROLES + PATH_API.CHECKBOX, headers(accessToken))
        return res.data;
    } catch (error) {
        console.log(error);
    }
}