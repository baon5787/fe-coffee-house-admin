import { createSelector } from "@reduxjs/toolkit";

export const isDimensionsSelector = (state) => state.dimensions?.isDimensions;
export const isSideBarSelector = (state) => state.dimensions?.isSideBar;
export const isMenuRefSelector = (state) => state.dimensions?.isMenuRef;

export const filtersSelector = (state) => state.filter?.filters;
export const userSelector = (state) => state.auth.login?.currentUser;
export const currentPageSelector = (state) => state.filter?.currentPage;
export const statusSelector = (state) => state.status?.allStatus;
export const couponStatusSelector = (state) => state.couponStatus?.allCouponStatus;
export const orderStatusSelector = (state) => state.orderStatus?.allOrderStatus;
export const genderSelector = (state) => state.gender?.allGender;
export const provinceSelector = (state) => state.province?.allProvince;

export const usersSelector = (state) => state.user?.allUser;
export const loadingUsersSelector = (state) => state.product?.isFetching;
export const isSelectedUsersSelector = (state) => state.product?.isSelected;
export const isCheckedUsers = createSelector(usersSelector, (allUser) => {
    const users = allUser?.users?.filter((user) => user?.isChecked);
    return users;
});

export const productsSelector = (state) => state.product?.allProduct;
export const loadingProductSelector = (state) => state.product?.isFetching;
export const errorProductSelector = (state) => state.product?.error;
export const titleErrorProductSelector = (state) => state.product?.msg;
export const isSelectedProductsSelector = (state) => state.product?.isSelected;
export const getListSkuSelectedProduct = createSelector(productsSelector, (allProduct) => {
    const products = allProduct?.products?.filter((product) => product?.isChecked);
    return products?.map((product) => product?.sku);
});

export const categoriesSelector = (state) => state.category?.allCategory;
export const loadingCategorySelector = (state) => state.category?.isFetching;
export const errorCategorySelector = (state) => state.category?.error;
export const titleErrorCategorySelector = (state) => state.category?.msg;
export const isSelectedCategorySelector = (state) => state.category?.isSelected;
export const getListCodeSelectedCategory = createSelector(categoriesSelector, (allCategory) => {
    const categories = allCategory?.categories?.filter((category) => category?.isChecked);
    return categories?.map((category) => category?.code);
});

export const productSizeSelector = (state) => state.productSize?.allProductSize;
export const loadingProductSizeSelector = (state) => state.productSize?.isFetching;
export const errorProductSizeSelector = (state) => state.productSize?.error;
export const titleErrorProductSizeSelector = (state) => state.productSize?.msg;

export const warehouseSelector = (state) => state.warehouse?.allWarehouse;
export const loadingWarehouseSelector = (state) => state.warehouse?.isFetching;
export const errorWarehouseSelector = (state) => state.warehouse?.error;
export const titleErrorWarehouseSelector = (state) => state.warehouse?.msg;
export const getErrorWarehouse = createSelector(errorWarehouseSelector, titleErrorWarehouseSelector,
    (error, msg) => {
        return {
            isError: error && !(!msg.trim()),
            msg: msg
        };
    }
);


export const sizesSelector = (state) => state.size?.allSize;
export const loadingSizeSelector = (state) => state.size?.isFetching;
export const errorSizeSelector = (state) => state.size?.error;
export const titleErrorSizeSelector = (state) => state.size?.msg;
export const isSelectedSizeSelector = (state) => state.size?.isSelected;
export const getListCodeSelectedSize = createSelector(sizesSelector, (allSize) => {
    const sizes = allSize?.sizes?.filter((size) => size?.isChecked);
    return sizes?.map((size) => size?.code);
});

export const getErrorSize = createSelector(errorSizeSelector, titleErrorSizeSelector,
    (error, msg) => {
        return {
            isError: error && !(!msg.trim()),
            msg: msg
        };
    }
);

export const couponSelector = (state) => state.coupon?.allCoupon;
export const isSelectedCouponSelector = (state) => state.coupon?.isSelected;
export const listCouponCode = createSelector(couponSelector, (allCoupon) => {
    const coupons = allCoupon?.coupons?.filter((coupon) => coupon?.isChecked);
    return coupons?.map((coupon) => coupon?.code);
});

export const orderSelector = (state) => state.order?.allOrder;
export const deliveryOrderSelector = (state) => state.deliveryOrder?.allDeliveryOrder;

export const searchTextSelector = (state) => state.filter?.filters?.title_like;
export const searchStatusSelector = (state) => state.filter?.filters?.status;
export const searchTimeStartSelector = (state) => state.filter?.filters?.time_start;
export const searchTimeEndedSelector = (state) => state.filter?.filters?.time_ended;
