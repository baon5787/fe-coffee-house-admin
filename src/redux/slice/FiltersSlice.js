import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_FILTERS } from "~/constants/AppConstant";
import { isFilter } from "~/utils/CheckValue";
import { isEqual } from "~/utils/Compare";

const FiltersSlice = createSlice({
    name: "filter",
    initialState: {
        filters: DEFAULT_FILTERS,
        currentPage: "",
    },
    reducers: {
        updateFilters: (state, action) => {
            state.filters = action.payload;
        },
        resetFilters: (state) => {
            state.filters = DEFAULT_FILTERS;
        },
        searchFilterChange: (state, action) => {
            state.filters = action.payload;
        },
        limitFilterChange: (state, action) => {

            const { newLimit, totalPage } = action.payload;

            let newFilters;
            if (state.filters?.page * newLimit > totalPage) {
                newFilters = {
                    limit: newLimit,
                    page: DEFAULT_FILTERS.page,
                }
            } else {
                newFilters = {
                    limit: parseInt(newLimit)
                };
            }

            state.filters = { ...state.filters, ...newFilters };
        },
        pageFilterChange: (state, action) => {
            state.filters = { ...state.filters, page: action.payload };
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
            state.filters = DEFAULT_FILTERS;
        },
        setFiltersDefault: (state) => {
            state.filters = {
                limit: state.filters?.limit,
                page: DEFAULT_FILTERS.page,
            }
        },
        resetFiltersAddData: (state) => {
            if (state.filters?.status || isFilter(state.filters)) {
                state.filters = DEFAULT_FILTERS;
            }
        },
        searchTextChange: (state, action) => {

            const newFilters = {
                ...state.filters,
                title_like: action.payload,
            }
            if (!isEqual(state.filters, newFilters)) {
                state.filters = {
                    ...newFilters,
                    page: DEFAULT_FILTERS.page,
                }
            }
        },
        searchStatusChange: (state, action) => {
            const newFilters = {
                ...state.filters,
                page: DEFAULT_FILTERS.page,
                status: action.payload,
            }
            if (!isEqual(state.filters, newFilters)) {
                state.filters = newFilters
            }
        },
        searchDateRangeChange: (state, action) => {

            const { time_start, time_ended } = action.payload;

            const newFilters = {
                ...state.filters,
                page: DEFAULT_FILTERS.page,
                time_start: time_start,
                time_ended: time_ended,
            }
            if (!isEqual(state.filters, newFilters)) {
                state.filters = newFilters
            }
        },
        sortName: (state, action) => {
            const newFilters = { ...state.filters, ...action.payload }
            if (!isEqual(state.filters, newFilters)) {
                state.filters = newFilters
            }
        },
        defaultSearchTextChange: (state) => {
            const newFilters = { ...state.filters, page: DEFAULT_FILTERS.page };
            delete newFilters['title_like'];
            state.filters = newFilters;
        },
        defaultSearchStatusChange: (state) => {
            if (state.filters?.status) {
                const newFilters = { ...state.filters, page: DEFAULT_FILTERS.page };
                delete newFilters["status"];
                state.filters = newFilters;
            }
        },
        defaultSearchDateRangeChange: (state) => {
            const newFilters = { ...state.filters, page: DEFAULT_FILTERS.page };
            delete newFilters["time_start"];
            delete newFilters["time_ended"];
            state.filters = newFilters;
        },
    }
});

export const {
    updateFilters,
    resetFilters,
    sortName,
    resetFiltersAddData,
    searchFilterChange,
    searchDateRangeChange,
    limitFilterChange,
    pageFilterChange,
    updateCurrentPage,
    setFiltersDefault,
    searchTextChange,
    searchStatusChange,
    defaultSearchTextChange,
    defaultSearchStatusChange,
    defaultSearchDateRangeChange,
} = FiltersSlice.actions;

export default FiltersSlice.reducer;