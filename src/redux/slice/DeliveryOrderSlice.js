import { createSlice } from "@reduxjs/toolkit";

const DeliveryOrderSlice = createSlice({
    name: "deliveryOrder",
    initialState: {
        allDeliveryOrder: null,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        getDeliveryOrdersStart: (state) => {
            state.isFetching = true;
        },
        getDeliveryOrdersSuccess: (state, action) => {
            state.isFetching = false;
            state.allDeliveryOrder = {
                deliveryOrders: action.payload?.deliveryOrders,
                totalPage: action.payload?.totalPage,
            };
            state.isSelected = false;
        },
        getDeliveryOrdersFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

export const {
    getDeliveryOrdersStart,
    getDeliveryOrdersSuccess,
    getDeliveryOrdersFailed
} = DeliveryOrderSlice.actions;

export default DeliveryOrderSlice.reducer;

