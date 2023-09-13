import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
    name: "order",
    initialState: {
        allOrder: null,
        isSelected: false,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        getOrdersStart: (state) => {
            state.isFetching = true;
        },
        getOrdersSuccess: (state, action) => {

            state.isFetching = false;

            const orders = action.payload?.orders.map((order) => {
                return { ...order, isChecked: false }
            });

            state.allOrder = {
                orders: orders,
                totalPage: action.payload?.totalPage,
            };
            state.isSelected = false;
        },
        getOrdersFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getOrderDetailByCodeStart: (state) => {
            state.isFetching = true;
        },
        getOrderDetailByCodeSuccess: (state) => {
            state.isFetching = false;
        },
        getOrderDetailByCodeFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
})

export const {
    getOrdersStart,
    getOrdersSuccess,
    getOrdersFailed,
    getOrderDetailByCodeStart,
    getOrderDetailByCodeSuccess,
    getOrderDetailByCodeFailed
} = OrderSlice.actions;

export default OrderSlice.reducer;