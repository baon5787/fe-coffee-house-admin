import axios from "axios";
import { headers, headersAndCancelToken } from "~/api/AxiosClient";
import { ERROR, PATH_API } from "~/constants/Paths";
import { getDeliveryOrdersFailed, getDeliveryOrdersSuccess, getDeliveryOrdersStart } from "~/redux/slice/DeliveryOrderSlice";
import { updateCurrentPage } from "~/redux/slice/FiltersSlice";

const FORM_EMPTY = {};

const DELIVERY_ORDERS = PATH_API.DELIVERY + PATH_API.ORDERS;

export const getOrdersUnconfimred = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {
    const url = DELIVERY_ORDERS + PATH_API.UNCONFIMRED + '?' + filters;
    return await getDeliveryOrders(url, cancelToken, accessToken, dispatch, axiosJwt, page,
        currentPage)
}

export const getOrdersUnaccomplishedOfUser = async (filters, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {
    const url = DELIVERY_ORDERS + PATH_API.UNACCOMPLISHED + '?' + filters;
    return await getDeliveryOrders(url, cancelToken, accessToken, dispatch, axiosJwt, page,
        currentPage)
}

export const getSearchOrdersUnaccomplishedOfUser = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken) => {
    const url = DELIVERY_ORDERS + PATH_API.UNACCOMPLISHED + PATH_API.SEARCH + '?' + filters;
    return await getSearchDeliveryOrders(url, accessToken, dispatch, axiosJwt, cancelToken);
}

export const getOrdersAccomplishedOfUser = async (filters, cancelToken, accessToken, dispatch,
    axiosJwt, page, currentPage) => {
    const url = DELIVERY_ORDERS + PATH_API.ACCOMPLISHED + '?' + filters;
    return await getDeliveryOrders(url, cancelToken, accessToken, dispatch, axiosJwt, page,
        currentPage);
}

export const getSearchOrdersAccomplishedOfUser = async (filters, accessToken, dispatch, axiosJwt,
    cancelToken) => {
    const url = DELIVERY_ORDERS + PATH_API.ACCOMPLISHED + PATH_API.SEARCH + '?' + filters;
    return await getSearchDeliveryOrders(url, accessToken, dispatch, axiosJwt, cancelToken);
}

export const getCoordinatesCustomer = async (address, mapToken, cancelToken) => {

    const urlMapBoxs = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapToken}`

    const urlGeoapify = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=cca6376f584f4786ba2a61aa03192c38`

    try {
        const res = await axios.get(urlGeoapify, {
            cancelToken: cancelToken.token,
        });
        const address = res?.data?.features[0]?.properties;
        if (address?.lon && address?.lat) {
            return {
                longitude: address?.lon,
                latitude: address?.lat
            };
        } else {
            const res = await axios.get(urlMapBoxs, {
                cancelToken: cancelToken.token,
            });
            const data = res?.data?.features[0]
            return {
                longitude: data?.center[0],
                latitude: data?.center[1]
            };
        }
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
        }
        return ERROR;
    }
}

export const getLine = async (address, addressCoffee, cancelToken, mapToken) => {

    // address text =  10.53399717959303, 107.39896259556394

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${addressCoffee.longitude},${addressCoffee.latitude};${address.longitude},${address.latitude}?steps=true&geometries=geojson&access_token=${mapToken}&language=vi`

    try {
        const res = await axios.get(url, {
            cancelToken: cancelToken.token,
        });
        const data = res.data.routes[0];
        return {
            coordinates: data.geometry.coordinates,
            steps: data.legs[0].steps,
            duration: data?.duration,
            distance: data?.distance
        };
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
        }
        return ERROR;
    }
}

export const getOrderDetailsByCodeAndUser = async (code, accessToken, axiosJwt, cancelToken) => {

    try {
        const res = await axiosJwt.get(DELIVERY_ORDERS + '/' + code,
            headersAndCancelToken(accessToken, cancelToken))
        return res.data;
    } catch (error) {

        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            if (error.response?.status === 400) {
                console.log(error.response?.data);
            }
        }
    }
}


export const getOrderConfirmation = async (code, accessToken, axiosJwt) => {
    try {
        const res = await axiosJwt.put(DELIVERY_ORDERS + `/${code}`, FORM_EMPTY,
            headers(accessToken));
        return res.data;
    } catch (error) {
        return Error;
    }
}

export const getListStateTranstionOrder = async (accessToken, axiosJwt) => {
    try {
        const res = await axiosJwt.get(DELIVERY_ORDERS + PATH_API.STATE_TRANSTION,
            headers(accessToken));
        return res.data;
    } catch (error) {
        return Error;
    }
}

export const getListStateTranstionPayment = async (accessToken, axiosJwt) => {
    try {
        const res = await axiosJwt.get(DELIVERY_ORDERS + PATH_API.PAYMENT + PATH_API.STATE_TRANSTION,
            headers(accessToken));
        return res.data;
    } catch (error) {
        return Error;
    }
}

export const orderStatusChange = async (code, event, accessToken, axiosJwt) => {
    try {
        const res = await axiosJwt.put(DELIVERY_ORDERS + `/${code}/event/${event}`, FORM_EMPTY,
            headers(accessToken));
        return res.data;
    } catch (error) {
        return Error;
    }
}

const getDeliveryOrders = async (url, cancelToken, accessToken, dispatch, axiosJwt, page,
    currentPage) => {
    dispatch(getDeliveryOrdersStart())

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        if (page !== currentPage) {
            dispatch(updateCurrentPage(currentPage))
        }
        dispatch(getDeliveryOrdersSuccess(res?.data))
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            dispatch(getDeliveryOrdersFailed())
        }
    }
}

const getSearchDeliveryOrders = async (url, accessToken, dispatch, axiosJwt, cancelToken) => {
    dispatch(getDeliveryOrdersStart())

    try {
        const res = await axiosJwt.get(url, headersAndCancelToken(accessToken, cancelToken));
        dispatch(getDeliveryOrdersSuccess(res?.data))
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            dispatch(getDeliveryOrdersFailed())
        }
    }
}