import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_INDEX, EMPTY_ARRAY } from "~/constants/AppConstant";

const WarehouseSlice = createSlice({
    name: "warehouse",
    initialState: {
        allWarehouse: EMPTY_ARRAY,
        isSelected: false,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        resetWarehouseError: (state) => {
            if (state.error || !(!state.msg.trim())) {
                state.error = false;
                state.msg = "";
            }
        },
        getWarehousesStart: (state) => {
            state.isFetching = true;
        },
        getWarehousesSuccess: (state, action) => {
            state.isFetching = false;

            const warehouses = action.payload?.warehouses.map((warehouse) => {
                return { ...warehouse, isChecked: false }
            });

            state.allWarehouse = {
                warehouses: warehouses,
                totalPage: action.payload?.totalPage,
            };

            state.isSelected = false;
        },
        getWarehousesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getWarehouseByProductIdAndSizeIdStart: (state) => {
            state.isFetching = true;
        },
        getWarehouseByProductIdAndSizeIdSuccess: (state) => {
            state.isFetching = false;
        },
        getWarehouseByProductIdAndSizeIdFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        updateWarehouseStart: (state) => {
            state.isFetching = true;
        },
        updateWarehouseSuccess: (state, action) => {
            state.isFetching = false;

            const { productId, sizeId, quantity } = action.payload;
            const warehouses = state.allWarehouse?.warehouses;
            const objIndex = warehouses?.findIndex((warehouse) =>
                warehouse?.productId === productId && warehouse?.sizeId === sizeId);

            if (objIndex >= DEFAULT_INDEX) {
                warehouses[objIndex].quantity = quantity;
            }
            state.allWarehouse.warehouses = warehouses;

        },
        updateWarehouseFailed: (state) => {
            state.isFetching = false;
        },
        getDeleteWarehouseByProductIdAndSizeIdStart: (state) => {
            state.isFetching = true;
        },
        getDeleteWarehouseByProductIdAndSizeIdSuccess: (state, action) => {
            state.isFetching = false;
            const { productId, sizeId } = action.payload;
            const warehouses = state.allWarehouse?.warehouses?.filter((warehouse) =>
                !(warehouse?.productId === productId && warehouse?.sizeId === sizeId));
            state.allWarehouse.warehouses = warehouses;
        },
        getDeleteWarehouseByProductIdAndSizeIdFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
    }
});

export const {
    resetWarehouseError,
    getWarehousesStart,
    getWarehousesSuccess,
    getWarehousesFailed,
    getWarehouseByProductIdAndSizeIdStart,
    getWarehouseByProductIdAndSizeIdSuccess,
    getWarehouseByProductIdAndSizeIdFailed,
    updateWarehouseStart,
    updateWarehouseSuccess,
    updateWarehouseFailed,
    getDeleteWarehouseByProductIdAndSizeIdStart,
    getDeleteWarehouseByProductIdAndSizeIdSuccess,
    getDeleteWarehouseByProductIdAndSizeIdFailed,
} = WarehouseSlice.actions;

export default WarehouseSlice.reducer;