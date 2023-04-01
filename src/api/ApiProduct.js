import { getProductStart, getProductSuccess, getProductFailed, deleteProductStart, deleteProductFailed, deleteProductSuccess, addProductSuccess, addProductFailed, addProductStart } from "../redux/productSlice";

export const getProducts = async (accesToken, dispatch, axiosJwt) => {
    dispatch(getProductStart());

    try {
        const res = await axiosJwt.get("/api/admin/products", {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        dispatch(getProductSuccess(res.data));
    } catch (error) {
        dispatch(getProductFailed());
    }
}

export const addProduct = async (product, accesToken, dispatch, navigate, axiosJwt) => {
    dispatch(addProductStart());

    try {
        const res = await axiosJwt.post("/api/admin/add/product", product, {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        dispatch(addProductSuccess(res.data));
        navigate("/add/product");
    } catch (error) {
        dispatch(addProductFailed(error));
    }
}

export const deleteProduct = async (code, accesToken, dispatch, axiosJwt) => {
    dispatch(deleteProductStart());

    try {
        const res = await axiosJwt.get("/api/admin/product/" + code, {
            headers: { 'Authorization': `Bearer ${accesToken}` },
        })
        alert(res.data);
        dispatch(deleteProductSuccess(code));
    } catch (error) {
        dispatch(deleteProductFailed());
    }
}