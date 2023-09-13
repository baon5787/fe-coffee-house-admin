import { DEFAULT_FILTERS, DEFAULT_INDEX, DEFAULT_PAGINATION, MIN_LENGTH, OPTION_PAGE, STATUS_PUBLISHED } from "~/constants/AppConstant";
import { updateData } from "~/helper/AppString";
import { pageFilterChange } from "~/redux/slice/FiltersSlice";
import { isEmptyArray, isValueArray, isValueFunction, isValueNumber, isValueObject } from "./CheckValue";
;

export const getValueByStatus = (allStatus, value) => {
    if (allStatus?.length === MIN_LENGTH || !allStatus) return;

    const status = allStatus?.filter((status) => status?.value === value);

    return status[DEFAULT_INDEX]?.label;
}

export const sortSelect = (statusAll) => {
    statusAll?.sort((a, b) => (a.value > b.value) ? 1
        : ((b.value > a.value) ? -1 : 0))
    return statusAll;
}

export const conversionNumberToVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

export const formatDate = (data) => {
    const date = new Date(data);
    let day = date.getDate().toLocaleString();
    let month = (date.getMonth() + 1).toLocaleString();
    let year = date.getFullYear();

    const MIN_LENGTH_STRING = 2;

    if (day?.length < MIN_LENGTH_STRING) {
        day = `0${day}`
    }

    if (month?.length < MIN_LENGTH_STRING) {
        month = `0${month}`
    }
    return [day, month, year].join('-');
}

export const formatDateTime = (data) => {

    if (!data || data === null) return;

    const date = new Date(data);
    let day = date.getDate().toLocaleString();
    let month = (date.getMonth() + 1).toLocaleString();
    let year = date.getFullYear();
    let hours = date.getHours().toLocaleString();
    let minutes = date.getMinutes().toLocaleString();
    let seconds = date.getSeconds().toLocaleString();

    const MIN_LENGTH_STRING = 2;

    if (day?.length < MIN_LENGTH_STRING) {
        day = `0${day}`
    }

    if (month?.length < MIN_LENGTH_STRING) {
        month = `0${month}`
    }

    if (hours?.length < MIN_LENGTH_STRING) {
        hours = `0${hours}`
    }

    if (minutes?.length < MIN_LENGTH_STRING) {
        minutes = `0${minutes}`
    }

    if (seconds?.length < MIN_LENGTH_STRING) {
        seconds = `0${seconds}`
    }

    return `${[day, month, year].join('-')} ${[hours, minutes, seconds].join(':')}`;
}

export const ordinalNumbers = (index, limit, currentPage) => {
    return (index + 1) + ((currentPage - 1) * limit);
};

export const getCouponTypeName = (couponType) => {
    return couponType === "MONEY" ? `Tiền` : `Phần trăm`;
}

export const getCouponPrice = (couponType, price) => {
    return couponType === "MONEY" ? conversionNumberToVND(price) : `${price}%`;
}

export const getCouponCondition = (couponCategory, condition) => {
    return couponCategory === "Tổng tiền" ? conversionNumberToVND(condition) : `${condition} sp`;
}

export const getClassNameStatus = (status) => {
    return status === STATUS_PUBLISHED ? "badge-light-success" : "badge-light-danger";
};

export const getTitleAction = (option) => {
    return option !== OPTION_PAGE.DISENABLE ? "Edit" : "Enabled";
}

export const checkDataAndFilter = (data, totalPage, filters, dispatch) => {

    // Delete Item
    const minTotalPage = 0
    if (data?.length === MIN_LENGTH && totalPage > minTotalPage) {

        if (filters?.page === DEFAULT_PAGINATION.PAGE || filters?.page < totalPage) {
            return updateData;
        }

        if (totalPage === filters?.page) {
            dispatch(pageFilterChange(filters.page - 1))
        }
    }

    //Add item
    if (data?.length > filters?.limit) return updateData;

    return undefined;
}

export const isUpdateData = (data, totalPage, filters, dispatch) => {
    if (!isValueArray(data) || !isValueNumber(totalPage) || !isValueObject(filters)
        || !isValueFunction(dispatch)) {
        console.error('Error props');
        return;
    }

    let isUpdate = false;

    // Delete Item
    const minTotalPage = 0
    if (data?.length === MIN_LENGTH && totalPage > minTotalPage) {

        if (filters?.page === DEFAULT_PAGINATION.PAGE || filters?.page < totalPage) {
            isUpdate = true;
        }

        if (totalPage === filters?.page) {
            dispatch(pageFilterChange(filters.page - 1))
        }
    }

    //Add item
    if (data?.length > filters?.limit) isUpdate = true;

    return isUpdate;
}

export const isLengthChecked = (data) => {
    if (isEmptyArray(data)) return false;
    return data?.filter((item) => !item?.isChecked).length <= MIN_LENGTH;
}

export const getIsDeleteSelect = (data) => {
    const numberChecked = data?.filter((item) => item.isChecked);
    return numberChecked?.length > MIN_LENGTH;
}

export const resetFiltersByPage = (currentPage, page, filters) => currentPage !== page ? DEFAULT_FILTERS : filters;