import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ARRAY, MIN_LENGTH } from "~/constants/AppConstant";
import { getIsDeleteSelect } from "~/utils/HandleTable";

const SizeSlice = createSlice({
    name: "size",
    initialState: {
        allSize: EMPTY_ARRAY,
        isFetching: false,
        isSelected: false,
        error: false,
        msg: "",
    },
    reducers: {
        resetSizeError: (state) => {
            if (state.error || !(!state.msg.trim())) {
                state.error = false;
                state.msg = "";
            }
        },
        getSizesStart: (state) => {
            state.isFetching = true;
        },
        getSizesSuccess: (state, action) => {
            state.isFetching = false;

            const sizes = action.payload?.sizes.map((size) => {
                return { ...size, isChecked: false }
            });

            state.allSize = {
                sizes: sizes,
                totalPage: action.payload?.totalPage,
                limit: action.payload?.limit,
                page: action.payload?.page,
            };

            state.isSelected = false;
        },
        getSizesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getDeleteSizeByCodeStart: (state) => {
            state.isFetching = true;
        },
        getDeleteSizeByCodeSuccess: (state, action) => {
            state.isFetching = false;
            const sizes = state?.allSize?.sizes?.filter(
                (size) => size?.code !== action.payload
            );
            state.allSize.sizes = sizes;
        },
        getDeleteSizeByCodeFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        addSizeStart: (state) => {
            state.isFetching = true;
        },
        addSizeSuccess: (state, action) => {
            state.isFetching = false;
            state.allSize?.sizes?.push({ ...action.payload, isChecked: false });
        },
        addSizeFailed: (state) => {
            state.isFetching = false;
        },
        getSizeByCodeStart: (state) => {
            state.isFetching = true;
        },
        getSizeByCodeSuccess: (state) => {
            state.isFetching = false;
        },
        getSizeByCodeFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        updateSizeStart: (state) => {
            state.isFetching = true;
        },
        updateSizeSuccess: (state, action) => {
            state.isFetching = false;
            const { code, data } = action.payload;
            const sizes = state.allSize?.sizes;
            const objIndex = sizes?.findIndex((size) => size.code === code);
            if (objIndex >= MIN_LENGTH) {
                sizes[objIndex].name = data?.name;
                sizes[objIndex].code = data?.code;
                sizes[objIndex].price = data?.price;
                state.allSize.sizes = sizes;
            }
        },
        updateSizeFailed: (state) => {
            state.isFetching = false;
        },
        deleteChangeSelectSizes: (state, action) => {
            state.isSelected = getIsDeleteSelect(action.payload);
            state.allSize = {
                ...state.allSize,
                sizes: action.payload,
            }
        },
        getTitleSelectedDeleteSizesStart: (state) => {
            state.isFetching = true;
        },
        getTitleSelectedDeleteSizesSuccess: (state) => {
            state.isFetching = false;
        },
        getTitleSelectedDeleteSizesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        selectedDeleteSizesStart: (state) => {
            state.isFetching = true;
        },
        selectedDeleteSizesSuccess: (state) => {
            state.allSize.sizes = state?.allSize?.sizes.filter((size) => !size?.isChecked);
            state.isSelected = false;
        },
        selectedDeleteSizesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
    }
});

export const {
    resetSizeError,
    getSizesStart,
    getSizesSuccess,
    getSizesFailed,
    getDeleteSizeByCodeStart,
    getDeleteSizeByCodeSuccess,
    getDeleteSizeByCodeFailed,
    addSizeStart,
    addSizeSuccess,
    addSizeFailed,
    getSizeByCodeStart,
    getSizeByCodeSuccess,
    getSizeByCodeFailed,
    updateSizeStart,
    updateSizeSuccess,
    updateSizeFailed,
    deleteChangeSelectSizes,
    getTitleSelectedDeleteSizesStart,
    getTitleSelectedDeleteSizesSuccess,
    getTitleSelectedDeleteSizesFailed,
    selectedDeleteSizesStart,
    selectedDeleteSizesSuccess,
    selectedDeleteSizesFailed,
} = SizeSlice.actions;

export default SizeSlice.reducer;