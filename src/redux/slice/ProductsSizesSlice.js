import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_INDEX, EMPTY_ARRAY } from "~/constants/AppConstant";

const ProductsSizesSlice = createSlice({
    name: "productSize",
    initialState: {
        allProductSize: EMPTY_ARRAY,
        isSelected: false,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        resetProductSizeError: (state) => {
            if (state.error || !(!state.msg.trim())) {
                state.error = false;
                state.msg = "";
            }
        },
        getProductSizesStart: (state) => {
            state.isFetching = true;
        },
        getProductSizesSuccess: (state, action) => {
            state.isFetching = false;

            const productsSizes = action.payload?.productsSizes.map((productSize) => {
                return { ...productSize, isChecked: false }
            });

            state.allProductSize = {
                productsSizes: productsSizes,
                totalPage: action.payload?.totalPage,
            };

            state.isSelected = false;
        },
        getProductSizesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getProductSizeByProductIdAndSizeIdStart: (state) => {
            state.isFetching = true;
        },
        getProductSizeByProductIdAndSizeIdSuccess: (state) => {
            state.isFetching = false;
        },
        getProductSizeByProductIdAndSizeIdFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        updateProductSizeStart: (state) => {
            state.isFetching = true
        },
        updateProductSizeSuccess: (state, action) => {
            state.isFetching = false;

            const { productId, sizeId, quantity } = action.payload;
            const productsSizes = state.allProductSize?.productsSizes;
            const objIndex = productsSizes?.findIndex((productSize) =>
                productSize?.productId === productId && productSize?.sizeId === sizeId);

            if (objIndex >= DEFAULT_INDEX) {
                productsSizes[objIndex].quantity = quantity;
            }
            state.allProductSize.productsSizes = productsSizes;
        },
        updateProductSizeFailed: (state) => {
            state.isFetching = false;
        },
        getDeleteProductSizeByProductIdAndSizeIdStart: (state) => {
            state.isFetching = true;
        },
        getDeleteProductSizeByProductIdAndSizeIdSuccess: (state, action) => {
            state.isFetching = false;
            const { productId, sizeId } = action.payload;
            const productsSizes = state.allProductSize?.productsSizes?.filter((productSize) =>
                !(productSize?.productId === productId && productSize?.sizeId === sizeId));
            state.allProductSize.productsSizes = productsSizes;
        },
        getDeleteProductSizeByProductIdAndSizeIdFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
    }
});

export const {
    resetProductSizeError,
    getProductSizesStart,
    getProductSizesSuccess,
    getProductSizesFailed,
    getProductSizeByProductIdAndSizeIdStart,
    getProductSizeByProductIdAndSizeIdSuccess,
    getProductSizeByProductIdAndSizeIdFailed,
    updateProductSizeStart,
    updateProductSizeSuccess,
    updateProductSizeFailed,
    getDeleteProductSizeByProductIdAndSizeIdStart,
    getDeleteProductSizeByProductIdAndSizeIdSuccess,
    getDeleteProductSizeByProductIdAndSizeIdFailed
} = ProductsSizesSlice.actions;

export default ProductsSizesSlice.reducer;