import axios from "axios";
import { headers, headersAndCancelToken, headersPostAndPut } from "~/api/AxiosClient";
import { updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { getDeleteWarehouseByProductIdAndSizeIdFailed, getDeleteWarehouseByProductIdAndSizeIdStart, getDeleteWarehouseByProductIdAndSizeIdSuccess, getWarehouseByProductIdAndSizeIdFailed, getWarehouseByProductIdAndSizeIdStart, getWarehouseByProductIdAndSizeIdSuccess, getWarehousesFailed, getWarehousesStart, getWarehousesSuccess, resetWarehouseError, updateWarehouseFailed, updateWarehouseStart, updateWarehouseSuccess } from "~/redux/slice/WarehouseSlice";
import { notificationErrorByList, notificationErrorByPathVariable, notificationErrorBySearchList, notificationErrorEditModal, notificationErrorForm, notificationSuccessModalForm } from "~/utils/Notification";
import { setErrorWarehouseForm } from "../validation/WarehouseValidation";

const { PATH, PATH_API } = require("~/constants/Paths");

const URL_WAREHOUSE_NOT_FOUND = `/${PATH.WAREHOUSES}/${PATH.NOT_FOUND}`;

export const getWarehouses = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {
    dispatch(getWarehousesStart());

    try {
        const res = await axiosJwt.get(`${PATH_API.WAREHOUSES}?${filters}`,
            headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(resetWarehouseError());
        dispatch(getWarehousesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorByList(error?.response, dispatch, getWarehousesFailed);
        }
    }
}

export const getSearchWarehouses = async (filters, cancelToken, accessToken, dispatch, axiosJwt,
    setErrorForbidden) => {
    dispatch(getWarehousesStart());

    try {
        const res = await axiosJwt.get(`${PATH_API.WAREHOUSES}${PATH_API.SEARCH}?${filters}`,
            headersAndCancelToken(accessToken, cancelToken));
        dispatch(resetWarehouseError());
        dispatch(getWarehousesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorBySearchList(error?.response, setErrorForbidden);
        }
    }
}

export const getWarehouseByProductIdAndSizeId = async (productId, sizeId, accessToken, dispatch,
    navigate, axiosJwt, handleCloseModal) => {
    dispatch(getWarehouseByProductIdAndSizeIdStart());

    try {
        const res = await axiosJwt.get(`${PATH_API.WAREHOUSES}/${productId}/${sizeId}`,
            headers(accessToken));
        dispatch(resetWarehouseError());
        dispatch(getWarehouseByProductIdAndSizeIdSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorEditModal(error?.response, dispatch, navigate, URL_WAREHOUSE_NOT_FOUND,
            getWarehouseByProductIdAndSizeIdFailed, handleCloseModal);
    }
}

export const updateWarehouse = async (productId, sizeId, data, accessToken, dispatch, axiosJwt,
    setError, handleCloseModal) => {

    const productSize = JSON.stringify(data);

    dispatch(updateWarehouseStart());

    try {
        const res = await axiosJwt.put(`${PATH_API.WAREHOUSES}/${productId}/${sizeId}`,
            productSize, headersPostAndPut(accessToken));
        dispatch(resetWarehouseError());
        dispatch(updateWarehouseSuccess({
            productId: productId,
            sizeId: sizeId,
            quantity: data?.quantity
        }));
        notificationSuccessModalForm(res?.data, handleCloseModal);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorWarehouseForm, setError);
        dispatch(updateWarehouseFailed());
    }
}

export const deleteWarehouse = async (productId, sizeId, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getDeleteWarehouseByProductIdAndSizeIdStart());

    try {
        const res = await axiosJwt.delete(`${PATH_API.WAREHOUSES}/${productId}/${sizeId}`,
            headers(accessToken));
        dispatch(resetWarehouseError());
        dispatch(getDeleteWarehouseByProductIdAndSizeIdSuccess({
            productId: productId,
            sizeId: sizeId,
        }));
        return res?.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_WAREHOUSE_NOT_FOUND,
            getDeleteWarehouseByProductIdAndSizeIdFailed);
    }
}