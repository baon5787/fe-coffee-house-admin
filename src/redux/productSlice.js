import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: {
            allProduct: null,
            isFetching: false,
            error: false
        },
        msg: "",
    },
    reducers: {
        getProductStart: (state) => {
            state.product.isFetching = true;
        },
        getProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.allProduct = action.payload;
        },
        getProductFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = true;
        },
        deleteProductStart: (state) => {
            state.product.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.msg = action.payload;
            console.log(action.payload);
        },
        deleteProductFailed: (state, action) => {
            state.product.isFetching = false;
            state.product.error = true;
            state.msg = action.payload;
        },
        addProductStart: (state) => {
            state.product.isFetching = true;
        },
        addProductSuccess: (state, action) => {
            state.product.isFetching = true;
            state.msg = action.payload;
        },
        addProductFailed: (state, action) => {
            state.product.isFetching = false;
            state.product.error = true;
            state.msg = action.payload;
        },
    }
})

export const {
    getProductStart,
    getProductSuccess,
    getProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
    addProductStart,
    addProductSuccess,
    addProductFailed
} = productSlice.actions;

export default productSlice.reducer;