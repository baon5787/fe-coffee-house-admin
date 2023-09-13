import axios from "axios";
import { headers, headersAndCancelToken } from "~/api/AxiosClient";
import { PATH_API } from "~/constants/Paths";
import { updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { getOrderDetailByCodeFailed, getOrderDetailByCodeStart, getOrderDetailByCodeSuccess, getOrdersFailed, getOrdersStart, getOrdersSuccess } from "~/redux/slice/OrderSlice";

export const getOrders = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {

    dispatch(getOrdersStart())

    try {
        const res = await axiosJwt.get(PATH_API.ORDERS + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) {
            dispatch(updateCurrentPage(currentPage))
        }
        dispatch(getOrdersSuccess(res?.data))
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            dispatch(getOrdersFailed())
        }
    }
}

export const getSearchOrders = async (filters, accessToken, dispatch, axiosJwt, cancelToken) => {

    dispatch(getOrdersStart());

    try {
        const res = await axiosJwt.get(PATH_API.ORDERS + PATH_API.SEARCH + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        dispatch(getOrdersSuccess(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            dispatch(getOrdersFailed())
        }
    }
}

export const getOrderDetailsByCode = async (code, accessToken, dispatch, axiosJwt) => {
    dispatch(getOrderDetailByCodeStart());

    try {
        const res = await axiosJwt.get(PATH_API.ORDERS + '/' + code, headers(accessToken))
        dispatch(getOrderDetailByCodeSuccess());
        return res.data;
    } catch (error) {
        if (error.response?.status === 400) {
            console.log(error.response?.data);
        }
        dispatch(getOrderDetailByCodeFailed());
    }
}