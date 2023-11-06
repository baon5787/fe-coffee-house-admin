import { createSlice } from "@reduxjs/toolkit";
import { getIsDeleteSelect } from "~/utils/HandleTable";

const { MIN_LENGTH, DEFAULT_FILTERS, EMPTY_ARRAY } = require("~/constants/AppConstant");

const updateCategory = (action, categories) => {
    const { code, data } = action.payload;
    const objIndex = categories?.findIndex((category) => category?.code === code);
    if (objIndex >= MIN_LENGTH) {
        categories[objIndex].name = data?.name;
        categories[objIndex].code = data?.code;
        categories[objIndex].status = data?.status;
        if (data?.parent) categories[objIndex].parent = data?.parent;
    }
    return categories;
}

const CategorySlice = createSlice({
    name: "category",
    initialState: {
        allCategory: EMPTY_ARRAY,
        isSelected: false,
        isFetching: false,
        error: false,
        msg: "",
    },
    reducers: {
        resetCategoryError: (state) => {
            if (state.error || !(!state.msg.trim())) {
                state.error = false;
                state.msg = "";
            }
        },
        getCategoriesStart: (state) => {
            state.isFetching = true;
        },
        getCategoriesSuccess: (state, action) => {
            state.isFetching = false;

            const categories = action.payload?.categories?.map((category) => {
                return { ...category, isChecked: false }
            });

            state.allCategory = {
                categories: categories,
                totalPage: action.payload?.totalPage,
            };

            state.isSelected = false;
        },
        getCategoriesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        addCategoryStart: (state) => {
            state.isFetching = true;
        },
        addCategorySuccess: (state, action) => {
            state.isFetching = false;

            if (!state.allCategory.categories) {
                state.allCategory.categories = [{ ...action.payload, isChecked: false }];
                state.allCategory.totalPage = state.allCategory?.totalPage + DEFAULT_FILTERS.page;
            } else {
                state.allCategory?.categories.push({ ...action.payload, isChecked: false })
            }
        },
        addCategoryFailed: (state) => {
            state.isFetching = false;
        },
        getCategoryByCodeStart: (state) => {
            state.isFetching = true;
        },
        getCategoryByCodeSuccess: (state) => {
            state.isFetching = false;
        },
        getCategoryByCodeFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        updateCategoryStart: (state) => {
            state.isFetching = true;
        },
        updateCategorySuccess: (state, action) => {
            state.isFetching = false;
            const categories = updateCategory(action, state.allCategory?.categories);
            state.allCategory.categories = categories;
        },
        updateCategoryFailed: (state) => {
            state.isFetching = false;
        },
        getTitleDeleteCategoryByCodeStart: (state) => {
            state.isFetching = true;
        },
        getTitleDeleteCategoryByCodeSuccess: (state) => {
            state.isFetching = false;
        },
        getTitleDeleteCategoryByCodeFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        getDeleteCategoryByCodeStart: (state) => {
            state.isFetching = true;
        },
        getDeleteCategoryByCodeSuccess: (state, action) => {
            state.isFetching = false;
            const categories = state.allCategory.categories.filter(
                (category) => category?.code !== action.payload
            );
            state.allCategory.categories = categories;
        },
        getDeleteCategoryByCodeFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        deleteChangeSelectCategories: (state, action) => {
            state.isSelected = getIsDeleteSelect(action.payload);
            state.allCategory = {
                ...state.allCategory,
                categories: action.payload,
            }
        },
        getTitleSelectedDeleteCategoriesStart: (state) => {
            state.isFetching = true;
        },
        getTitleSelectedDeleteCategoriesSuccess: (state) => {
            state.isFetching = false;
        },
        getTitleSelectedDeleteCategoriesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
        selectedDeleteCategoriesStart: (state) => {
            state.isFetching = true;
        },
        selectedDeleteCategoriesSuccess: (state) => {
            state.isFetching = false;

            const categories = state.allCategory.categories.filter(
                (category) => !category?.isChecked
            );

            state.allCategory.categories = categories;
            state.isSelected = false;
        },
        selectedDeleteCategoriesFailed: (state, action) => {
            state.isFetching = false;
            state.error = true;
            state.msg = action.payload;
        },
    }
})

export const {
    resetCategoryError,
    getCategoriesStart,
    getCategoriesSuccess,
    getCategoriesFailed,
    addCategoryStart,
    addCategorySuccess,
    addCategoryFailed,
    getCategoryByCodeStart,
    getCategoryByCodeSuccess,
    getCategoryByCodeFailed,
    updateCategoryStart,
    updateCategorySuccess,
    updateCategoryFailed,
    getTitleDeleteCategoryByCodeStart,
    getTitleDeleteCategoryByCodeSuccess,
    getTitleDeleteCategoryByCodeFailed,
    getDeleteCategoryByCodeStart,
    getDeleteCategoryByCodeSuccess,
    getDeleteCategoryByCodeFailed,
    deleteChangeSelectCategories,
    getTitleSelectedDeleteCategoriesStart,
    getTitleSelectedDeleteCategoriesSuccess,
    getTitleSelectedDeleteCategoriesFailed,
    selectedDeleteCategoriesStart,
    selectedDeleteCategoriesSuccess,
    selectedDeleteCategoriesFailed,
} = CategorySlice.actions;

export default CategorySlice.reducer;