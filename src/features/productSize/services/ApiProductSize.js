import axios from "axios";
import { headers, headersAndCancelToken, headersPostAndPut } from "~/api/AxiosClient";
import { PATH, PATH_API } from "~/constants/Paths";
import { resetFiltersAddData, updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { getDeleteProductSizeByProductIdAndSizeIdFailed, getDeleteProductSizeByProductIdAndSizeIdStart, getDeleteProductSizeByProductIdAndSizeIdSuccess, getProductSizeByProductIdAndSizeIdFailed, getProductSizeByProductIdAndSizeIdStart, getProductSizeByProductIdAndSizeIdSuccess, getProductSizesFailed, getProductSizesStart, getProductSizesSuccess, resetProductSizeError, updateProductSizeFailed, updateProductSizeStart, updateProductSizeSuccess } from "~/redux/slice/ProductsSizesSlice";
import { setErrorProductSizeForm } from "../validation/ProductSizeValidation";
import { notificationErrorByList, notificationErrorByPathVariable, notificationErrorBySearchList, notificationErrorEditModal, notificationErrorForm, notificationSuccessModalForm } from "~/utils/Notification";

const PRODUCTS_SIZES = PATH_API.PRODUCTS + PATH_API.SIZES;

const URL_WAREHOUSE_NOT_FOUND = `/${PATH.WAREHOUSES}/${PATH.NOT_FOUND}`;

export const getProductsSizes = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {
    dispatch(getProductSizesStart());

    try {
        const res = await axiosJwt.get(PRODUCTS_SIZES + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(resetProductSizeError());
        dispatch(getProductSizesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorByList(error?.response, dispatch, getProductSizesFailed);
        }
    }
}

export const getSearchProductsSizes = async (filters, cancelToken, accessToken, dispatch, axiosJwt,
    setErrorForbidden) => {
    dispatch(getProductSizesStart());

    try {
        const res = await axiosJwt.get(PRODUCTS_SIZES + PATH_API.SEARCH + '?' + filters,
            headersAndCancelToken(accessToken, cancelToken));
        dispatch(resetProductSizeError());
        dispatch(getProductSizesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorBySearchList(error?.response, setErrorForbidden);
        }
    }
}

export const getProductSizeByProductIdAndSizeId = async (productId, sizeId, accessToken, dispatch,
    navigate, axiosJwt, handleCloseModal) => {
    dispatch(getProductSizeByProductIdAndSizeIdStart());

    try {
        const res = await axiosJwt.get(PRODUCTS_SIZES + '/' + productId + '/' + sizeId,
            headers(accessToken));
        dispatch(resetProductSizeError());
        dispatch(getProductSizeByProductIdAndSizeIdSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorEditModal(error?.response, dispatch, navigate, URL_WAREHOUSE_NOT_FOUND,
            getProductSizeByProductIdAndSizeIdFailed, handleCloseModal);
    }
}

export const updateProductSize = async (productId, sizeId, data, accessToken, dispatch, axiosJwt,
    setError, handleCloseModal) => {

    const productSize = JSON.stringify(data);

    dispatch(updateProductSizeStart());

    try {
        const res = await axiosJwt.put(PRODUCTS_SIZES + '/' + productId + '/' + sizeId,
            productSize, headersPostAndPut(accessToken));
        dispatch(resetFiltersAddData());
        dispatch(updateProductSizeSuccess({
            productId: productId,
            sizeId: sizeId,
            quantity: data?.quantity
        }));

        notificationSuccessModalForm(res?.data, handleCloseModal);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorProductSizeForm, setError);
        dispatch(updateProductSizeFailed());
    }
}

export const deleteProductSize = async (productId, sizeId, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getDeleteProductSizeByProductIdAndSizeIdStart());

    try {
        const res = await axiosJwt.delete(`${PRODUCTS_SIZES}/${productId}/${sizeId}`,
            headers(accessToken));
        dispatch(resetProductSizeError());
        dispatch(getDeleteProductSizeByProductIdAndSizeIdSuccess({
            productId: productId,
            sizeId: sizeId,
        }));
        return res?.data;
    } catch (error) {
        console.log(error);
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_WAREHOUSE_NOT_FOUND,
            getDeleteProductSizeByProductIdAndSizeIdFailed);
    }
}