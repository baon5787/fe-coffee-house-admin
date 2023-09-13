import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_INDEX, INCREASE_TOTALPAGE } from "~/constants/AppConstant";
import { getIsDeleteSelect } from "~/utils/HandleTable";

const CouponSlice = createSlice({
    name: "coupon",
    initialState: {
        allCoupon: null,
        isFetching: false,
        isSelected: false,
        error: false,
        msg: "",
    },
    reducers: {
        setCoupons: (state, action) => {

            const coupons = action.payload?.coupons.map((coupon) => {
                return { ...coupon, isChecked: false }
            });

            state.allCoupon = {
                coupons: coupons,
                totalPage: action.payload?.totalPage,
            };
            state.isSelected = false;
        },
        addCouponStart: (state) => {
            state.isFetching = true;
        },
        addCouponSuccess: (state, action) => {
            state.isFetching = false;

            if (!state.allCoupon.coupons) {
                state.allCoupon.coupons = [{ ...action.payload, isChecked: false }];
                state.allCoupon.totalPage = state.allCoupon?.totalPage + INCREASE_TOTALPAGE;
            } else {
                state.allCoupon?.coupons?.push({ ...action.payload, isChecked: false });
            }
        },
        addCouponFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getCouponByCodeStart: (state) => {
            state.isFetching = true;
        },
        getCouponByCodeSuccess: (state) => {
            state.isFetching = false;
        },
        getCouponByCodeFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateCouponStart: (state) => {
            state.isFetching = true;
        },
        updateCouponSuccess: (state, action) => {
            state.isFetching = false;

            const { code, data } = action.payload;
            const coupons = state.allCoupon.coupons
            const objIndex = coupons?.findIndex((coupon) => coupon?.code === code);

            if (objIndex >= DEFAULT_INDEX) {
                coupons[objIndex].name = data?.name;
                coupons[objIndex].code = data?.code;
                coupons[objIndex].price = data?.price;
                coupons[objIndex].condition = data?.condition;
                coupons[objIndex].quantity = data?.quantity;
                coupons[objIndex].expired = data?.expired;
                coupons[objIndex].couponType = data?.couponType;
                coupons[objIndex].status = data?.status;
                coupons[objIndex].couponCategory = data?.couponCategory;
                coupons[objIndex].product = data?.product;
                state.allCoupon.coupons = coupons;
            }

        },
        updateCouponFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getDeleteCouponByCodeSuccess: (state, action) => {
            const coupons = state?.allCoupon?.coupons?.filter((coupon) =>
                coupon?.code !== action.payload);
            state.allCoupon.coupons = coupons;
        },
        deleteChangeSelectCoupons: (state, action) => {
            state.isSelected = getIsDeleteSelect(action.payload);
            state.allCoupon = {
                ...state.allCoupon,
                coupons: action.payload,
            }
        },
        selectedDeleteCouponSuccess: (state) => {
            state.allCoupon.coupons = state?.allCoupon?.coupons?.filter((coupon) => !coupon?.isChecked);
            state.isSelected = false;
        },
    }
});

export const {
    setCoupons,
    addCouponStart,
    addCouponSuccess,
    addCouponFailed,
    getCouponByCodeStart,
    getCouponByCodeSuccess,
    getCouponByCodeFailed,
    updateCouponStart,
    updateCouponSuccess,
    updateCouponFailed,
    getDeleteCouponByCodeSuccess,
    deleteChangeSelectCoupons,
    selectedDeleteCouponSuccess,
} = CouponSlice.actions;

export default CouponSlice.reducer;
