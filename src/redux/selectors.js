import { createSelector } from "@reduxjs/toolkit";

//Dimensions
export const isDimensionsSelector = (state) => state.dimensions?.isDimensions;
export const isAsideSelector = (state) => state.dimensions?.isAside;

//Auth
export const userSelector = (state) => state.auth?.currentUser;

//Filter
export const filtersSelector = (state) => state.filter?.filters;
export const currentPageSelector = (state) => state.filter?.currentPage;
export const searchTextSelector = (state) => state.filter?.filters?.title_like;
export const searchStatusSelector = (state) => state.filter?.filters?.status;
export const statusSelector = (state) => state.status?.allStatus;

// export const usersSelector = (state) => state.user?.allUser;

// Product
export const productsSelector = (state) => state.product?.allProduct;
export const loadingProductSelector = (state) => state.product?.isFetching;
export const errorProductSelector = (state) => state.product?.error;
export const titleErrorProductSelector = (state) => state.product?.msg;
export const isSelectedProductsSelector = (state) => state.product?.isSelected;
export const getListSkuSelectedProduct = createSelector(productsSelector, (allProduct) => {
    const products = allProduct?.products?.filter((product) => product?.isChecked);
    return products?.map((product) => product?.sku);
});

// Category
export const categoriesSelector = (state) => state.category?.allCategory;
export const loadingCategorySelector = (state) => state.category?.isFetching;
export const errorCategorySelector = (state) => state.category?.error;
export const titleErrorCategorySelector = (state) => state.category?.msg;
export const isSelectedCategorySelector = (state) => state.category?.isSelected;
export const getListCodeSelectedCategory = createSelector(categoriesSelector, (allCategory) => {
    const categories = allCategory?.categories?.filter((category) => category?.isChecked);
    return categories?.map((category) => category?.code);
});

// Size
export const sizesSelector = (state) => state.size?.allSize;
export const loadingSizeSelector = (state) => state.size?.isFetching;
export const errorSizeSelector = (state) => state.size?.error;
export const titleErrorSizeSelector = (state) => state.size?.msg;
export const isSelectedSizeSelector = (state) => state.size?.isSelected;
export const getListCodeSelectedSize = createSelector(sizesSelector, (allSize) => {
    const sizes = allSize?.sizes?.filter((size) => size?.isChecked);
    return sizes?.map((size) => size?.code);
});