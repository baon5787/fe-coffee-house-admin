import axios from "axios";
import { headers, headersAndCancelToken, headersPostAndPut } from "~/api/AxiosClient";
import { ERROR, PATH_API } from "~/constants/Paths";
import { addCouponFailed, addCouponStart, addCouponSuccess, getCouponByCodeFailed, getCouponByCodeStart, getCouponByCodeSuccess, getDeleteCouponByCodeSuccess, selectedDeleteCouponSuccess, setCoupons, updateCouponFailed, updateCouponStart, updateCouponSuccess } from "~/redux/slice/CouponSlice";
import { resetFiltersAddData, updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { setErrorFormCoupon } from "../validation/CouponValidation";


export const getCoupons = async (filters, accessToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {

    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(setCoupons(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            return ERROR;
        }
    }
}

export const getSearchCoupons = async (filters, accessToken, dispatch, axiosJwt, cancelToken) => {

    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + PATH_API.SEARCH + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        dispatch(setCoupons(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            return ERROR;
        }
    }
}

export const addCoupon = async (data, accessToken, dispatch, axiosJwt, setError,
    couponCategoryName) => {

    const coupon = JSON.stringify(data);

    dispatch(addCouponStart());

    try {
        const res = await axiosJwt.post(PATH_API.COUPONS, coupon, headersPostAndPut(accessToken));
        dispatch(resetFiltersAddData());
        dispatch(addCouponSuccess({
            ...data,
            expired: data?.expired.toString(),
            couponCategory: couponCategoryName,
        }));
        return res?.data;
    } catch (error) {
        dispatch(addCouponFailed())

        const res = error?.response;

        if (res?.status === 401 || res?.status === 400) {
            setErrorFormCoupon(res?.data, setError);
        }
        return ERROR;
    }
}


export const getCouponByCode = async (code, accessToken, dispatch, axiosJwt) => {

    dispatch(getCouponByCodeStart())

    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + '/' + code, headers(accessToken));
        dispatch(getCouponByCodeSuccess())
        return res.data;
    } catch (error) {
        const res = error?.response;
        dispatch(getCouponByCodeFailed());
        if (res?.status === 400) {
            const data = res?.data;
            return data;
        }
    }
}

export const updateCoupon = async (code, data, accessToken, dispatch, axiosJwt, setError,
    couponCategoryName) => {

    const coupon = JSON.stringify(data);

    dispatch(updateCouponStart());

    try {
        const res = await axiosJwt.put(PATH_API.COUPONS + "/" + code, coupon,
            headers(accessToken));

        dispatch(updateCouponSuccess({
            code: code,
            data: {
                ...data,
                expired: data?.expired.toString(),
                couponCategory: couponCategoryName,
            },
        }));

        return res?.data;
    } catch (error) {

        const res = error?.response;

        if (res?.status === 401 || res?.status === 400) {
            setErrorFormCoupon(res?.data, setError)
        }
        dispatch(updateCouponFailed());
        return ERROR;
    }
}

export const getDisenableCouponByCode = async (code, accesToken, dispatch, axiosJwt) => {

    try {
        const res = await axiosJwt.delete(PATH_API.COUPONS + '/' + code, headers(accesToken))
        dispatch(getDeleteCouponByCodeSuccess(code));
        return res.data;
    } catch (error) {
        if (error.response?.status === 400) {
            console.log(error.response?.data);
        }
        return ERROR;
    }
}

export const getTitleDisenableSelectedCoupons = async (codes, accesToken, axiosJwt) => {
    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + PATH_API.SELECTED_DISENABLE + '/' + codes,
            headers(accesToken));
        return res.data;
    } catch (error) {
        return ERROR;
    }
}

export const getDisenableSelectedCoupons = async (codes, accesToken, dispatch, axiosJwt) => {
    const url = PATH_API.COUPONS + PATH_API.SELECTED_DISENABLE + '/' + codes;
    try {
        const res = await axiosJwt.delete(url, headers(accesToken));
        dispatch(selectedDeleteCouponSuccess());
        return res?.data;
    } catch (error) {
        return ERROR;
    }
}


export const getDisenableCoupons = async (filters, accessToken, dispatch, axiosJwt, page,
    currentPage, cancelToken) => {

    try {
        const res = await axiosJwt.get(PATH_API.COUPONS + PATH_API.DISENABLE + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(setCoupons(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            return ERROR;
        }
    }
}

export const getSearchDisenableCoupons = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken) => {

    const url = PATH_API.COUPONS + PATH_API.DISENABLE + PATH_API.SEARCH + '?' + filters;

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        dispatch(setCoupons(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            return ERROR;
        }
    }
}

export const getEnableCouponByCode = async (code, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.COUPONS + PATH_API.DISENABLE + PATH_API.ENABLED + '/' + code
    try {
        const res = await axiosJwt.delete(url, headers(accesToken))
        dispatch(getDeleteCouponByCodeSuccess(code));
        return res.data;
    } catch (error) {
        if (error.response?.status === 400) {
            console.log(error.response?.data);
        }
        return ERROR;
    }
}

export const getTitleEnabledSelectedCoupons = async (codes, accesToken, axiosJwt) => {

    const url = PATH_API.COUPONS + PATH_API.DISENABLE + PATH_API.SELECTED_ENABLED + '/' + codes;

    try {
        const res = await axiosJwt.get(url, headers(accesToken));
        return res.data;
    } catch (error) {
        return ERROR;
    }
}

export const getEnabledSelectedCoupons = async (codes, accesToken, dispatch, axiosJwt) => {

    const url = PATH_API.COUPONS + PATH_API.DISENABLE + PATH_API.SELECTED_ENABLED + '/' + codes;

    try {
        const res = await axiosJwt.delete(url, headers(accesToken));
        dispatch(selectedDeleteCouponSuccess());
        return res?.data;
    } catch (error) {
        return ERROR;
    }
}