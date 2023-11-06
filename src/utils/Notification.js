import { swalMixinError, swalMixinSuccess } from "~/components/swal/Swal";
import { HTTP_STATUS, MSG_ERROR } from "~/constants/AppConstant";
import { isValueFunction, isValueObject, isValueString } from "./CheckValue";
import { getTitleErrorParam } from "./HandleValue";

export const notificationErrorForm = (res, setErrorForm, setError) => {

    if (!isValueObject(res) || !isValueFunction(setErrorForm) || !isValueFunction(setError)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    let title;

    if (status === HTTP_STATUS.BAD_REQUEST) {
        setErrorForm(data, setError);
        title = MSG_ERROR.BAD_REQUEST;
    }

    if (status === HTTP_STATUS.FORBIDDEN) {
        title = MSG_ERROR.FORBIDDEN
    }

    if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR || status === HTTP_STATUS.PAYLOAD_TOO_LARGE
        || status === HTTP_STATUS.NOT_FOUND) {
        title = data
    }

    if (!title) return;

    swalMixinError(title);
}

export const notificationSuccessModalForm = (data, handleCloseModal) => {

    if (!isValueString(data) || !isValueFunction(handleCloseModal)) {
        throw new Error('Error props');
    }

    swalMixinSuccess(data);
    handleCloseModal();
}

export const notificationSuccessForm = (data, dispatch, navigate, url, reducers) => {

    if (!isValueString(data) || !isValueFunction(dispatch) || !isValueFunction(navigate)
        || !url || !url.trim() || !isValueFunction(reducers)) {
        throw new Error('Error props');
    }

    swalMixinSuccess(data);
    setTimeout(() => {
        dispatch(reducers());
        navigate(url)
    }, 2000);
}

export const notificationErrorEdit = (res, dispatch, navigate, urlNotFound, reducers) => {
    if (!isValueObject(res) || !isValueFunction(dispatch) || !isValueFunction(navigate)
        || !urlNotFound || !urlNotFound.trim() || !isValueFunction(reducers)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    if (status === HTTP_STATUS.FORBIDDEN) {
        dispatch(reducers(MSG_ERROR.FORBIDDEN));
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
        dispatch(reducers(data));
        navigate(urlNotFound);
    }
}

export const notificationErrorEditModal = (res, dispatch, navigate, urlNotFound, reducers,
    handleCloseModal) => {
    if (!isValueObject(res) || !isValueFunction(dispatch) || !isValueFunction(navigate)
        || !urlNotFound || !urlNotFound.trim() || !isValueFunction(reducers)
        || !isValueFunction(handleCloseModal)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    if (status === HTTP_STATUS.FORBIDDEN) {
        handleCloseModal();
        swalMixinError(MSG_ERROR.FORBIDDEN);
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
        dispatch(reducers(data));
        navigate(urlNotFound);
    }
}

export const notificationErrorByPathVariable = (res, dispatch, navigate, urlNotFound, reducers) => {
    if (!isValueObject(res) || !isValueFunction(dispatch) || !isValueFunction(navigate)
        || !urlNotFound || !urlNotFound.trim() || !isValueFunction(reducers)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    if (status === HTTP_STATUS.FORBIDDEN) {
        swalMixinError(MSG_ERROR.FORBIDDEN);
    }

    if (status === HTTP_STATUS.NOT_FOUND && !isValueString(data)) {
        swalMixinError(MSG_ERROR.NOT_API);
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
        dispatch(reducers(data));
        navigate(urlNotFound);
    }
}

export const notificationErrorByList = (res, dispatch, reducers) => {

    if (!isValueObject(res) || !isValueFunction(dispatch) || !isValueFunction(reducers)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    if (status === HTTP_STATUS.FORBIDDEN) {
        dispatch(reducers(MSG_ERROR.FORBIDDEN));
    }

    if (status === HTTP_STATUS.BAD_REQUEST) {
        swalMixinError(getTitleErrorParam(data));
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
        swalMixinError(MSG_ERROR.NOT_API);
    }

}

export const notificationErrorBySearchList = (res, setErrorForbidden) => {

    if (!isValueObject(res) || !isValueFunction(setErrorForbidden)) {
        throw new Error('Error props');
    }

    const status = res?.status;
    const data = res?.data;

    if (status === HTTP_STATUS.FORBIDDEN) {
        setErrorForbidden(true);
        swalMixinError(MSG_ERROR.FORBIDDEN);
    }

    if (status === HTTP_STATUS.BAD_REQUEST) {
        setErrorForbidden(true);
        swalMixinError(getTitleErrorParam(data));
    }

    if (status === HTTP_STATUS.NOT_FOUND) {
        swalMixinError(MSG_ERROR.NOT_API);
    }
}