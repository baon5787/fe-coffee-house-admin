import { createSlice } from "@reduxjs/toolkit";

const CouponStatusSlice = createSlice({
    name: "couponStatus",
    initialState: {
        allCouponStatus: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getSelectCouponStatusesStart: (state) => {
            state.isFetching = true;
        },
        getSelectCouponStatusesSuccess: (state, action) => {
            state.isFetching = false;
            state.allCouponStatus = action.payload;
            state.error = false;
        },
        getSelectCouponStatusesFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getSelectCouponStatusesStart,
    getSelectCouponStatusesSuccess,
    getSelectCouponStatusesFailed,
} = CouponStatusSlice.actions;

export default CouponStatusSlice.reducer;
