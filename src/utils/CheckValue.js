import { DEFAULT_FILTERS, MIN_LENGTH, OBJECT_MIN_LENGTH } from "~/constants/AppConstant";

export const isValueString = (value) => typeof value === 'string';

export const isValueObject = (value) => typeof value === 'object';

export const isValueFunction = (value) => typeof value === 'function';

export const isValueNumber = (value) => typeof value === 'number';

export const isValueUndefined = (value) => typeof value === 'undefined';

export const isValueArray = (value) => Array.isArray(value);

export const isEmptyArray = (data) => !data || data?.length === MIN_LENGTH;

export const isObjectOneValue = (data) => data && data?.length === OBJECT_MIN_LENGTH;


export const isParam = (param) => param !== null && param;

export const isFilter = (filter) => filter?.title_like || filter?.sortField
    || filter?.filter?.sortDir;

export const isData = (data) => data === null || !data || isEmptyArray(data);

export const isError = (error, msg) => error && !(!msg.trim());

export const isNotData = (data) => isEmptyArray(data) && data < DEFAULT_FILTERS.page;

// export const isStateOrderStatus = (orderStatus) => {
//     return orderStatus !== ORDER_STATUS.DELIVERED && orderStatus !== ORDER_STATUS.CANCELLED;
// }

// export const isStatePaymentStatus = (paymentStatus) => {
//     return paymentStatus !== PAYMENT_STATUS.SUCCESS && paymentStatus !== PAYMENT_STATUS.CANCELLED;
// }