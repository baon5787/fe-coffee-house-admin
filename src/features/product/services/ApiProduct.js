import {
    getProductsStart, getProductsSuccess, getProductsFailed,
    getProductBySkuStart, getProductBySkuSuccess, getProductBySkuFailed,
    addOrUpdateProductSuccess, addOrUpdateProductStart, addOrUpdateProductFailed,
    selectedDeleteProductsStart, selectedDeleteProductsSuccess, selectedDeleteProductsFailed,
    getDeleteProductStart, getDeleteProductSuccess, getDeleteProductFailed,
    getTitleSelectedDeleteProductsStart, getTitleSelectedDeleteProductsSuccess,
    getTitleSelectedDeleteProductsFailed, resetProductError
} from "~/redux/slice/ProductSlice";
import { updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { headers, headersAndCancelToken, headersPostAndPutImage } from "~/api/AxiosClient";
import { PATH, PATH_API } from "~/constants/Paths";
import { setErrorForm } from "../validation/ProductValidation";
import {
    notificationErrorByList, notificationErrorByPathVariable, notificationErrorBySearchList,
    notificationErrorEdit,
    notificationErrorForm, notificationSuccessForm
} from "~/utils/Notification";
import axios from "axios";

const URL_PRODUCT = `/${PATH.PRODUCTS}`;
const URL_PRODUCT_NOT_FOUND = `${URL_PRODUCT}/${PATH.NOT_FOUND}`;

export const getProducts = async (filters, accessToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {

    dispatch(getProductsStart());

    const url = PATH_API.PRODUCTS + '?' + filters;

    getProduct(url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch);
}

export const getSearchProducts = async (filters, accessToken, dispatch, axiosJwt, cancelToken,
    setErrorForbidden) => {

    dispatch(getProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.SEARCH + '?' + filters;

    getSearchProduct(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const addProduct = async (product, accessToken, dispatch, navigate, axiosJwt, setError) => {
    dispatch(addOrUpdateProductStart());

    try {
        const res = await axiosJwt.post(PATH_API.PRODUCTS, product, headersPostAndPutImage(accessToken));
        dispatch(resetProductError());
        notificationSuccessForm(res?.data, dispatch, navigate, URL_PRODUCT, addOrUpdateProductSuccess);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorForm, setError);
        dispatch(addOrUpdateProductFailed());
    }
}

export const getProductByCode = async (sku, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getProductBySkuStart());

    try {
        const res = await axiosJwt.get(PATH_API.PRODUCTS + '/' + sku, headers(accessToken));
        dispatch(resetProductError());
        dispatch(getProductBySkuSuccess());
        return res.data;
    } catch (error) {
        notificationErrorEdit(error?.response, dispatch, navigate, URL_PRODUCT_NOT_FOUND,
            getProductBySkuFailed);
    }
}

export const updateProduct = async (sku, product, accessToken, dispatch, navigate, axiosJwt,
    setError) => {
    dispatch(addOrUpdateProductStart());
    try {
        const res = await axiosJwt.put(PATH_API.PRODUCTS + '/' + sku, product,
            headersPostAndPutImage(accessToken));
        dispatch(resetProductError());
        notificationSuccessForm(res?.data, dispatch, navigate, URL_PRODUCT, addOrUpdateProductSuccess);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorForm, setError);
        dispatch(addOrUpdateProductFailed());
    }
}

export const getDisenableProductBySku = async (sku, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getDeleteProductStart());

    const url = PATH_API.PRODUCTS + '/' + sku;

    return deleteProduct(sku, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleDisenableSelectedProducts = async (skus, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getTitleSelectedDeleteProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.SELECTED_DISENABLE + '/' + skus;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getDisenableSelectedProducts = async (skus, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(selectedDeleteProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.SELECTED_DISENABLE + '/' + skus;

    return getSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}


// Disenable Products   
export const getDisenableProducts = async (filters, accessToken, dispatch, axiosJwt, page,
    currentPage, cancelToken) => {

    dispatch(getProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.DISENABLE + '?' + filters;

    getProduct(url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch);
}

export const getSearchDisenableProducts = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken, setErrorForbidden) => {

    dispatch(getProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.DISENABLE + PATH_API.SEARCH + '?' + filters;

    getSearchProduct(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const getEnabledProductBySku = async (sku, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getDeleteProductStart());

    const url = PATH_API.PRODUCTS + PATH_API.DISENABLE + PATH_API.ENABLED + '/' + sku;

    return deleteProduct(sku, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleEnableSelectedProducts = async (skus, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getTitleSelectedDeleteProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.DISENABLE + PATH_API.SELECTED_ENABLED + '/' + skus;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getEnableSelectedProducts = async (skus, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(selectedDeleteProductsStart());

    const url = PATH_API.PRODUCTS + PATH_API.DISENABLE + PATH_API.SELECTED_ENABLED + '/' + skus

    return getSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

//Create function
const getProduct = async (url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(resetProductError());
        dispatch(getProductsSuccess(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorByList(error?.response, dispatch, getProductsFailed);
        }
    }
}

const getSearchProduct = async (url, axiosJwt, accessToken, cancelToken, dispatch,
    setErrorForbidden) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        dispatch(resetProductError());
        dispatch(getProductsSuccess(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorBySearchList(error?.response, setErrorForbidden);
        }
    }
}

const deleteProduct = async (sku, url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetProductError());
        dispatch(getDeleteProductSuccess(sku));
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_PRODUCT_NOT_FOUND,
            getDeleteProductFailed);
    }
}

const getTitleSelectedDelete = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        dispatch(resetProductError());
        dispatch(getTitleSelectedDeleteProductsSuccess());
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_PRODUCT_NOT_FOUND,
            getTitleSelectedDeleteProductsFailed);
    }
}

const getSelectedDelete = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetProductError());
        dispatch(selectedDeleteProductsSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_PRODUCT_NOT_FOUND,
            selectedDeleteProductsFailed);
    }
}


