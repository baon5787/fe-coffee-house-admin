import axios from "axios";
import { headers, headersAndCancelToken, headersPostAndPut } from "~/api/AxiosClient";
import { PATH, PATH_API } from "~/constants/Paths";
import { addCategoryFailed, addCategoryStart, addCategorySuccess, getCategoriesFailed, getCategoriesStart, getCategoriesSuccess, getCategoryByCodeFailed, getCategoryByCodeStart, getCategoryByCodeSuccess, getDeleteCategoryByCodeFailed, getDeleteCategoryByCodeStart, getDeleteCategoryByCodeSuccess, getTitleDeleteCategoryByCodeFailed, getTitleDeleteCategoryByCodeStart, getTitleDeleteCategoryByCodeSuccess, getTitleSelectedDeleteCategoriesFailed, getTitleSelectedDeleteCategoriesStart, getTitleSelectedDeleteCategoriesSuccess, resetCategoryError, selectedDeleteCategoriesFailed, selectedDeleteCategoriesStart, selectedDeleteCategoriesSuccess, updateCategoryFailed, updateCategoryStart, updateCategorySuccess } from "~/redux/slice/CategorySlice";
import { resetFiltersAddData, updateCurrentPage } from "~/redux/slice/FiltersSlice";
import { notificationErrorByList, notificationErrorByPathVariable, notificationErrorBySearchList, notificationErrorEditModal, notificationErrorForm, notificationSuccessModalForm } from "~/utils/Notification";
import { setErrorParentForm } from "../validation/ParentCategoryValidation";
import { setErrorSubForm } from "../validation/SubCategoryValidation";

const URL_CATEGORY_NOT_FOUND = `/${PATH.CATEGORIES}/${PATH.NOT_FOUND}`;

// Parent Categories
const CATEGORIES_PARENT = PATH_API.CATEGORIES + PATH_API.PARENT;

export const getParentCategories = async (filters, accessToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_PARENT + '?' + filters;

    getCategories(url, axiosJwt, accessToken, cancelToken, dispatch, page, currentPage);
}

export const getSearchParentCategories = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken, setErrorForbidden) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_PARENT + PATH_API.SEARCH + '?' + filters;

    getSearchCategores(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const addParentCategory = async (data, accessToken, dispatch, axiosJwt, setError,
    handleCloseModal) => {

    const category = JSON.stringify(data);

    dispatch(addCategoryStart());

    createCategory(CATEGORIES_PARENT, data, category, axiosJwt, accessToken, dispatch, setError,
        setErrorParentForm, handleCloseModal);
}

export const getParentCategoryByCode = async (code, accessToken, dispatch, navigate, axiosJwt,
    handleCloseModal) => {

    dispatch(getCategoryByCodeStart());

    const url = CATEGORIES_PARENT + '/' + code

    getCategoryByCode(url, axiosJwt, accessToken, navigate, dispatch, handleCloseModal);
}

export const updateParentCategory = async (code, data, accessToken, dispatch, axiosJwt, setError,
    handleCloseModal) => {

    const category = JSON.stringify(data);

    dispatch(updateCategoryStart());

    const url = CATEGORIES_PARENT + '/' + code;

    updateCategory(code, url, data, category, axiosJwt, accessToken, dispatch, setError,
        setErrorParentForm, handleCloseModal);
}

export const getDisenableParentCategory = async (code, accessToken, dispatch, navigate, axiosJwt) => {

    dispatch(getDeleteCategoryByCodeStart());

    const url = CATEGORIES_PARENT + '/' + code;

    return deleteCategory(code, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleDisenableSelectedParentCategories = async (codes, accessToken, dispatch,
    navigate, axiosJwt) => {

    dispatch(getTitleSelectedDeleteCategoriesStart());

    const url = CATEGORIES_PARENT + PATH_API.SELECTED_DISENABLE + '/' + codes;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getDisenableSelectedParentCategories = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(selectedDeleteCategoriesStart());

    const url = CATEGORIES_PARENT + PATH_API.SELECTED_DISENABLE + '/' + codes;

    return getSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

// Sub Categories
const CATEGORIES_SUB = PATH_API.CATEGORIES + PATH_API.SUB;

export const getSubCategories = (filters, accessToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_SUB + '?' + filters;

    getCategories(url, axiosJwt, accessToken, cancelToken, dispatch, page, currentPage);
}

export const getSearchSubCategories = async (filters, accessToken, dispatch, axiosJwt, cancelToken,
    setErrorForbidden) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_SUB + PATH_API.SEARCH + '?' + filters;

    getSearchCategores(url, axiosJwt, accessToken, cancelToken, dispatch, setErrorForbidden);
}

export const addSubCategory = async (data, accessToken, dispatch, axiosJwt, setError,
    parentName, handleCloseModal) => {

    const category = JSON.stringify(data);

    dispatch(addCategoryStart());

    const updateData = {
        ...data,
        parent: parentName,
    }

    createCategory(CATEGORIES_SUB, updateData, category, axiosJwt, accessToken, dispatch, setError,
        setErrorSubForm, handleCloseModal);
}

export const getSubCategoryByCode = async (code, accessToken, dispatch, navigate, axiosJwt,
    handleCloseModal) => {
    dispatch(getCategoryByCodeStart());

    const url = CATEGORIES_SUB + '/' + code;

    getCategoryByCode(url, axiosJwt, accessToken, navigate, dispatch, handleCloseModal);
}

export const updateSubCategory = async (code, data, accessToken, dispatch, axiosJwt,
    setError, parentName, handleCloseModal) => {

    const url = CATEGORIES_SUB + '/' + code;

    const category = JSON.stringify(data);

    dispatch(updateCategoryStart());

    const updateData = {
        ...data,
        parent: parentName,
    }

    updateCategory(code, url, updateData, category, axiosJwt, accessToken, dispatch, setError,
        setErrorSubForm, handleCloseModal);
}

export const getDisenableSubCategory = async (code, accessToken, dispatch, navigate, axiosJwt) => {

    dispatch(getDeleteCategoryByCodeStart());

    const url = CATEGORIES_SUB + '/' + code;

    return deleteCategory(code, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleDisenableSelectedSubCategories = async (codes, accessToken, dispatch,
    navigate, axiosJwt) => {
    dispatch(getTitleSelectedDeleteCategoriesStart());

    const url = CATEGORIES_SUB + PATH_API.SELECTED_DISENABLE + '/' + codes;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getDisenableSelectedSubCategories = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(selectedDeleteCategoriesStart());

    const url = CATEGORIES_SUB + PATH_API.SELECTED_DISENABLE + '/' + codes;

    return getSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}


// Disenable Categories
const CATEGORIES_DISENABLE = PATH_API.CATEGORIES + PATH_API.DISENABLE;

export const getDisenableCategories = (filters, accesToken, dispatch, axiosJwt, page, currentPage,
    cancelToken) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_DISENABLE + '?' + filters;

    getCategories(url, axiosJwt, accesToken, cancelToken, dispatch, page, currentPage);
}

export const getSearchDisenableCategories = async (filters, accesToken, dispatch, axiosJwt,
    cancelToken, setErrorForbidden) => {
    dispatch(getCategoriesStart());

    const url = CATEGORIES_DISENABLE + PATH_API.SEARCH + '?' + filters;

    getSearchCategores(url, axiosJwt, accesToken, cancelToken, dispatch, setErrorForbidden);
}

export const getEnableCategoryByCode = async (code, accessToken, dispatch, navigate, axiosJwt) => {

    dispatch(getDeleteCategoryByCodeStart());

    const url = CATEGORIES_DISENABLE + PATH_API.ENABLED + '/' + code;

    return deleteCategory(code, url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleEnableSelectedCategories = async (codes, accessToken, dispatch, navigate,
    axiosJwt) => {
    dispatch(getTitleSelectedDeleteCategoriesStart());

    const url = CATEGORIES_DISENABLE + PATH_API.SELECTED_ENABLED + '/' + codes;

    return getTitleSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getEnableSelectedCategories = async (codes, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(selectedDeleteCategoriesStart());

    const url = CATEGORIES_DISENABLE + PATH_API.SELECTED_ENABLED + '/' + codes

    return getSelectedDelete(url, axiosJwt, accessToken, dispatch, navigate);
}

export const getTitleDeleteCategory = async (code, accessToken, dispatch, navigate, axiosJwt) => {
    dispatch(getTitleDeleteCategoryByCodeStart())
    try {
        const res = await axiosJwt.get(CATEGORIES_DISENABLE + '/' + code, headers(accessToken));
        dispatch(resetCategoryError());
        dispatch(getTitleDeleteCategoryByCodeSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_CATEGORY_NOT_FOUND,
            getTitleDeleteCategoryByCodeFailed);
    }
}

export const deleteCategoryByCode = async (code, accessToken, dispatch, navigate, axiosJwt) => {

    dispatch(getDeleteCategoryByCodeStart());

    const url = CATEGORIES_DISENABLE + '/' + code;

    return deleteCategory(code, url, axiosJwt, accessToken, dispatch, navigate);
}


// Create function
const getCategories = async (url, axiosJwt, accessToken, cancelToken, dispatch, page, currentPage) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) dispatch(updateCurrentPage(currentPage));
        dispatch(resetCategoryError())
        dispatch(getCategoriesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            notificationErrorByList(error?.response, dispatch, getCategoriesFailed);
        }
    }
}

const getSearchCategores = async (url, axiosJwt, accessToken, cancelToken, dispatch,
    setErrorForbidden) => {

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken))
        dispatch(resetCategoryError());
        dispatch(getCategoriesSuccess(res?.data));
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            notificationErrorBySearchList(error?.response, setErrorForbidden);
        }
    }
}

const getCategoryByCode = async (url, axiosJwt, accessToken, navigate, dispatch,
    handleCloseModal) => {
    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        dispatch(resetCategoryError());
        dispatch(getCategoryByCodeSuccess());
        return res?.data;
    } catch (error) {
        notificationErrorEditModal(error?.response, dispatch, navigate, URL_CATEGORY_NOT_FOUND,
            getCategoryByCodeFailed, handleCloseModal);
    }
}

const createCategory = async (url, data, category, axiosJwt, accessToken, dispatch, setError,
    setErrorForm, handleCloseModal) => {

    try {
        const res = await axiosJwt.post(url, category, headersPostAndPut(accessToken))
        dispatch(resetFiltersAddData());
        dispatch(addCategorySuccess(data));
        notificationSuccessModalForm(`${res?.data}${data?.name}`, handleCloseModal);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorForm, setError);
        dispatch(addCategoryFailed());
    }
}


const updateCategory = async (code, url, data, category, axiosJwt, accessToken, dispatch, setError,
    setErrorForm, handleCloseModal) => {

    try {

        const res = await axiosJwt.put(url, category, headersPostAndPut(accessToken));
        dispatch(updateCategorySuccess({
            code: code,
            data: data
        }));
        notificationSuccessModalForm(res?.data, handleCloseModal);
    } catch (error) {
        notificationErrorForm(error?.response, setErrorForm, setError);
        dispatch(updateCategoryFailed());
    }
}

const deleteCategory = async (code, url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetCategoryError());
        dispatch(getDeleteCategoryByCodeSuccess(code));
        return res?.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_CATEGORY_NOT_FOUND,
            getDeleteCategoryByCodeFailed);
    }
}

const getTitleSelectedDelete = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.get(url, headers(accessToken));
        dispatch(resetCategoryError());
        dispatch(getTitleSelectedDeleteCategoriesSuccess());
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_CATEGORY_NOT_FOUND,
            getTitleSelectedDeleteCategoriesFailed);
    }
}

const getSelectedDelete = async (url, axiosJwt, accessToken, dispatch, navigate) => {
    try {
        const res = await axiosJwt.delete(url, headers(accessToken));
        dispatch(resetCategoryError());
        dispatch(selectedDeleteCategoriesSuccess());
        return res.data;
    } catch (error) {
        notificationErrorByPathVariable(error?.response, dispatch, navigate, URL_CATEGORY_NOT_FOUND,
            selectedDeleteCategoriesFailed);
    }
}