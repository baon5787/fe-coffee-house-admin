import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ARRAY } from "~/constants/AppConstant";

const StatusSlice = createSlice({
    name: "status",
    initialState: {
        allStatus: EMPTY_ARRAY,
        isFetching: false,
        error: false
    },
    reducers: {
        setStatus: (state) => {
            state.allStatus = EMPTY_ARRAY;
        },
        getSelectStatusesStart: (state) => {
            state.isFetching = true;
        },
        getSelectStatusesSucces: (state, action) => {
            state.isFetching = false;
            state.allStatus = action.payload;
            state.error = false;
        },
        getSelectStatusesFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getSelectStatusesStart,
    getSelectStatusesSucces,
    getSelectStatusesFailed,
    setStatus,
} = StatusSlice.actions;

export default StatusSlice.reducer;