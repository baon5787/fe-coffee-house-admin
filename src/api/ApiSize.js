import { getSizeFailed, getSizeStart, getSizeSucces } from "~/redux/sizeSlice";


export const getSizes = async (accesToken, dispatch, axiosJwt) => {
    dispatch(getSizeStart());

    try {
        const res = await axiosJwt.get("/api/admin/sizes", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        dispatch(getSizeSucces(res.data));
    } catch (error) {
        dispatch(getSizeFailed());
    }
}