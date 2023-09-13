import { ERROR, PATH_API } from "~/constants/Paths";
import { headers } from "./AxiosClient";
import { getSelectStatusesStart, getSelectStatusesSucces, getSelectStatusesFailed } from "~/redux/slice/StatusSlice";
import { getSelectCouponStatusesFailed, getSelectCouponStatusesStart, getSelectCouponStatusesSuccess } from "~/redux/slice/CouponStatusSlice";
import { getSelectOrderStatusesFailed, getSelectOrderStatusesStart, getSelectOrderStatusesSuccess } from "~/redux/slice/OrderStatusSlice";
import { getSelectProvinceFailed, getSelectProvinceSuccess } from "~/redux/slice/ProvinceSlice";


export const getSelectStatuses = async (accessToken, dispatch, axiosJwt) => {
    dispatch(getSelectStatusesStart());
    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.STATUSES, headers(accessToken));
        dispatch(getSelectStatusesSucces(res?.data));
        return res.data;
    } catch (error) {
        dispatch(getSelectStatusesFailed());
    }
}

export const getSelectParentCategories = async (accessToken, dispatch, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.CATEGORIES + PATH_API.PARENT + PATH_API.SELECT,
            headers(accessToken))
        return res.data;
    } catch (error) {
    }
}

export const getSelectSubCategories = async (accessToken, dispatch, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.CATEGORIES + PATH_API.SUB + PATH_API.SELECT,
            headers(accessToken));
        return res.data;
    } catch (error) {
    }
}

export const getSelectProducts = async (accessToken, axiosJwt) => {
    try {
        const res = await axiosJwt.get(PATH_API.PRODUCTS + PATH_API.SELECT, headers(accessToken))
        return res?.data;
    } catch (error) {
    }
}

export const getSelectCouponStatues = async (accessToken, dispatch, axiosJwt) => {

    dispatch(getSelectCouponStatusesStart());

    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.COUPONS + PATH_API.STATUSES,
            headers(accessToken));
        dispatch(getSelectCouponStatusesSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getSelectCouponStatusesFailed());
    }
}

export const getSelectCouponCategories = async (accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + PATH_API.CATEGORIES + PATH_API.SELECT,
            headers(accessToken));
        return res?.data;
    } catch (error) {
    }
}

export const getSelectCouponTypes = async (accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.COUPONS + "/types",
            headers(accessToken));
        return res?.data;
    } catch (error) {
    }
}


export const getSelectOrderStatuses = async (accessToken, dispatch, axiosJwt) => {

    dispatch(getSelectOrderStatusesStart());

    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.ORDERS + PATH_API.STATUSES,
            headers(accessToken));
        dispatch(getSelectOrderStatusesSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getSelectOrderStatusesFailed());
    }
}

export const getSelectProvince = async (accessToken, dispatch, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.PROVINCES,
            headers(accessToken));
        dispatch(getSelectProvinceSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getSelectProvinceFailed());
    }
}

export const getSelectDistrict = async (province, accessToken, axiosJwt) => {

    try {
        const res = await axiosJwt.get(PATH_API.SELECT + PATH_API.DISTRICTS + `/${province}`,
            headers(accessToken));
        return res?.data;
    } catch (error) {
        return ERROR;
    }
}

export const getSelectWard = async (province, district, accessToken, axiosJwt) => {

    const url = PATH_API.SELECT + PATH_API.WARD + `/${province}/${district}`;

    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        return res?.data;
    } catch (error) {
        return ERROR;
    }
}


