import { createSlice } from "@reduxjs/toolkit";

const OrderStatusSlice = createSlice({
    name: "orderStatus",
    initialState: {
        allOrderStatus: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getSelectOrderStatusesStart: (state) => {
            state.isFetching = true;
        },
        getSelectOrderStatusesSuccess: (state, action) => {
            state.isFetching = false;
            state.allOrderStatus = action.payload;
            state.error = false;
        },
        getSelectOrderStatusesFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getSelectOrderStatusesStart,
    getSelectOrderStatusesSuccess,
    getSelectOrderStatusesFailed,
} = OrderStatusSlice.actions;

export default OrderStatusSlice.reducer;
