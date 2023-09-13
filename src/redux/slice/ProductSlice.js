import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ARRAY } from "~/constants/AppConstant";
import { getIsDeleteSelect } from "~/utils/HandleTable";


const ProductSlice = createSlice({
    name: "product",
    initialState: {
        allProduct: EMPTY_ARRAY,
        isSelected: false,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        resetProductError: (state) => {
            if (state.error || !(!state.msg.trim())) {
                state.error = false;
                state.msg = "";
            }
        },
        getProductsStart: (state) => {
            state.isFetching = true;
        },
        getProductsSuccess: (state, action) => {
            state.isFetching = false;

            const products = action.payload?.products.map((product) => {
                return { ...product, isChecked: false }
            });

            state.allProduct = {
                products: products,
                totalPage: action.payload?.totalPage,
            };

            state.isSelected = false;
        },
        getProductsFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        deleteChangeSelectProducts: (state, action) => {
            state.isSelected = getIsDeleteSelect(action.payload);
            state.allProduct = {
                ...state.allProduct,
                products: action.payload,
            }
        },
        addOrUpdateProductStart: (state) => {
            state.isFetching = true;
        },
        addOrUpdateProductSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
            state.msg = "";
        },
        addOrUpdateProductFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getProductBySkuStart: (state) => {
            state.isFetching = false;
        },
        getProductBySkuSuccess: (state) => {
            state.isFetching = false;
            state.error = false;
        },
        getProductBySkuFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getDeleteProductStart: (state) => {
            state.isFetching = true;
        },
        getDeleteProductSuccess: (state, action) => {
            state.isFetching = false;
            const products = state.allProduct.products.filter((product) => product.sku !== action.payload);
            state.allProduct.products = products
        },
        getDeleteProductFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getTitleSelectedDeleteProductsStart: (state) => {
            state.isFetching = true;
        },
        getTitleSelectedDeleteProductsSuccess: (state) => {
            state.isFetching = false;
        },
        getTitleSelectedDeleteProductsFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        selectedDeleteProductsStart: (state) => {
            state.isFetching = true;
        },
        selectedDeleteProductsSuccess: (state) => {
            state.isFetching = false;

            const products = state.allProduct.products.filter((product) => !product?.isChecked)
            state.allProduct.products = products;
            state.isSelected = false;
        },
        selectedDeleteProductsFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
    }
})

export const {
    resetProductError,
    getProductsStart,
    getProductsSuccess,
    getProductsFailed,
    deleteChangeSelectProducts,
    addOrUpdateProductStart,
    addOrUpdateProductSuccess,
    addOrUpdateProductFailed,
    getProductBySkuStart,
    getProductBySkuSuccess,
    getProductBySkuFailed,
    getDeleteProductStart,
    getDeleteProductSuccess,
    getDeleteProductFailed,
    getTitleSelectedDeleteProductsStart,
    getTitleSelectedDeleteProductsSuccess,
    getTitleSelectedDeleteProductsFailed,
    selectedDeleteProductsStart,
    selectedDeleteProductsSuccess,
    selectedDeleteProductsFailed,
} = ProductSlice.actions;

export default ProductSlice.reducer;