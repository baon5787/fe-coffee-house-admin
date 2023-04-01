import { getStatusFailed, getStatusStart, getStatusSucces } from "~/redux/statusSlice";

export const getStatus = async (accesToken, dispatch, axiosJwt) => {
    dispatch(getStatusStart());

    try {
        const res = await axiosJwt.get("/api/admin/status", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        dispatch(getStatusSucces(res.data));
    } catch (error) {
        dispatch(getStatusFailed());
    }
}

export const getStatusAll = async (accesToken, dispatch, axiosJwt) => {
    dispatch(getStatusStart());

    try {
        const res = await axiosJwt.get("/api/admin/status/all", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        dispatch(getStatusSucces(res.data));
    } catch (error) {
        dispatch(getStatusFailed());
    }
}