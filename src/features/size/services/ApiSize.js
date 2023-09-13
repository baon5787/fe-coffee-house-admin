import axios from "axios";
import { headers, headersAndCancelToken, headersPostAndPut } from "~/api/AxiosClient";
import { PATH, PATH_API } from "~/constants/Paths";
import { resetFiltersAddData, updateCurrentPage } from "~/redux/slice/FiltersSlice";
import {
    addSizeFailed, addSizeStart, addSizeSuccess,
    getSizeByCodeFailed, getSizeByCodeStart, getSizeByCodeSuccess,
    updateSizeFailed, updateSizeStart,
    updateSizeSuccess, getDeleteSizeByCodeSuccess, resetSizeError, getSizesStart, getSizesSuccess, getSizesFailed, getDeleteSizeByCodeStart, getDeleteSizeByCodeFailed, getTitleSelectedDeleteSizesSuccess, getTitleSelectedDeleteSizesFailed, getTitleSelectedDeleteSizesStart, selectedDeleteSizesSuccess, selectedDeleteSizesFailed, selectedDeleteSizesStart
} from "~/redux/slice/SizeSlice";
import { setErrorFormSize } from "../validation/SizeValidation";
import { notificationErrorByList, notificationErrorByPathVariable, notificationErrorBySearchList, notificationErrorEditModal, notificationErrorForm, notificationSuccessModalForm } from "~/utils/Notification";

const URL_SIZE_NOT_FOUND = `/${PATH.SIZES}/${PATH.NOT_FOUND}`;

export const getSizes = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {

    dispatch(getSizesStart());

    const url = PATH_API.SIZES + '?' + filters;

    getSize(url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch);
}

export const getSearchSizes = async (filters, accessToken, dispatch, axiosJwt, cancelToken,
    setErrorForbidden) => {
    dispatch(getSizesStart());

    const url = PATH_API.SIZES + PATH_API.SEARCH + '?' + filters;

    getSearchSize(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const addSize = async (data, accessToken, dispatch, axiosJwt, setError, handleCloseModal) => {

    const size = JSON.stringify(data);

    dispatch(addSizeStart());

    try {
        const res = await axiosJwt.post(PATH_API.SIZES, size, headersPostAndPut(accessToken));
        dispatch(resetFiltersAddData());
        dispatch(addSizeSuccess(data));
        notificationSuccessModalForm(`${res?.data}${data?.name}`, handleCloseModal);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorFormSize, setError);
        dispatch(addSizeFailed());
    }
}


export const getSizeByCode = async (code, accessToken, dispatch, navigate, axiosJwt,
    handleCloseModal) => {

    dispatch(getSizeByCodeStart());

    try {
        const res = await axiosJwt.get(`${PATH_API.SIZES}/${code}`, headers(accessToken));
        dispatch(resetSizeError());
        dispatch(getSizeByCodeSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorEditModal(error?.response, dispatch, navigate, URL_SIZE_NOT_FOUND,
            getSizeByCodeFailed, handleCloseModal);
    }
}

export const updateSize = async (code, data, accessToken, dispatch, axiosJwt, setError,
    handleCloseModal) => {

    dispatch(updateSizeStart());

    const size = JSON.stringify(data);

    try {
        const res = await axiosJwt.put(PATH_API.SIZES + "/" + code, size,
            headersPostAndPut(accessToken));
        dispatch(updateSizeSuccess({
            code: code,
            data: data,
        }));
        notificationSuccessModalForm(`${res?.data}`, handleCloseModal);
    } catch (error) {
        dispatch(updateSizeFailed())
        notificationErrorForm(error?.response, setErrorFormSize, setError);
    }
}

export const getDisenableSizeByCode = async (code, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getDeleteSizeByCodeStart());

    const url = `${PATH_API.SIZES}/${code}`;

    return getDeleteSize(code, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleDisenableSelectedSize = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getTitleSelectedDeleteSizesStart());

    const url = `${PATH_API.SIZES}${PATH_API.SELECTED_DISENABLE}/${codes}`;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getDisenableSelectedSizes = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(selectedDeleteSizesStart());
    const url = `${PATH_API.SIZES}${PATH_API.SELECTED_DISENABLE}/${codes}`;
    return getSelectedDeleteSizes(url, axiosJwt, accessToken, dispatch, navigate);
}

//Disenable
export const getDisenableSizes = async (filters, cancelToken, accessToken, dispatch, axiosJwt,
    page, currentPage) => {
    dispatch(getSizesStart());

    const url = PATH_API.SIZES + PATH_API.DISENABLE + '?' + filters;

    getSize(url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch);
}

export const getSearchDisenableSizes = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken, setErrorForbidden) => {
    dispatch(getSizesStart());

    const url = PATH_API.SIZES + PATH_API.DISENABLE + PATH_API.SEARCH + '?' + filters;

    getSearchSize(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const getEnableSizeByCode = async (code, accessToken, dispatch, navigate, axiosJwt) => {

    dispatch(getDeleteSizeByCodeStart());

    const url = PATH_API.SIZES + PATH_API.DISENABLE + PATH_API.ENABLED + '/' + code;

    return getDeleteSize(code, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleEnableSelectedSizes = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {

    dispatch(getTitleSelectedDeleteSizesStart());

    const url = `${PATH_API.SIZES}${PATH_API.DISENABLE}${PATH_API.SELECTED_ENABLED}/${codes}`;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getEnableSelectedSizes = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {

    dispatch(selectedDeleteSizesStart());
    const url = `${PATH_API.SIZES}${PATH_API.DISENABLE}${PATH_API.SELECTED_ENABLED}/${codes}`;
    return getSelectedDeleteSizes(url, axiosJwt, accessToken, dispatch, navigate);
}

export const deleteSize = async (code, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getDeleteSizeByCodeStart());

    const url = `${PATH_API.SIZES}${PATH_API.DISENABLE}/${code}`;

    return getDeleteSize(code, url, axiosJwt, accessToken, dispatch, navigate);
}


//Create function
const getSize = async (url, page, currentPage, axiosJwt, accessToken, cancelToken, dispatch) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(resetSizeError());
        dispatch(getSizesSuccess(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorByList(error?.response, dispatch, getSizesFailed);
        }
    }
}

const getSearchSize = async (url, axiosJwt, accessToken, cancelToken, dispatch,
    setErrorForbidden) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        dispatch(resetSizeError());
        dispatch(getSizesSuccess(res.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled ', error.message);
        } else {
            notificationErrorBySearchList(error?.response, setErrorForbidden);
        }
    }
}

const getTitleSelectedDelete = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        dispatch(resetSizeError());
        dispatch(getTitleSelectedDeleteSizesSuccess());
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_SIZE_NOT_FOUND,
            getTitleSelectedDeleteSizesFailed);
    }
}

const getDeleteSize = async (code, url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetSizeError());
        dispatch(getDeleteSizeByCodeSuccess(code));
        return res?.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_SIZE_NOT_FOUND,
            getDeleteSizeByCodeFailed);
    }
}

const getSelectedDeleteSizes = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetSizeError());
        dispatch(selectedDeleteSizesSuccess());
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_SIZE_NOT_FOUND,
            selectedDeleteSizesFailed);
    }
}