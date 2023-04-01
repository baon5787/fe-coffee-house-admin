import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
    name: "status",
    initialState: {
        statuses: {
            statusAll: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        getStatusStart: (state) => {
            state.statuses.isFetching = true;
        },
        getStatusSucces: (state, action) => {
            state.statuses.isFetching = false;
            state.statuses.statusAll = action.payload;
            state.statuses.error = false;
        },
        getStatusFailed: (state) => {
            state.statuses.isFetching = false;
            state.statuses.error = true;
        }
    }
});

export const {
    getStatusStart,
    getStatusSucces,
    getStatusFailed,
} = statusSlice.actions;

export default statusSlice.reducer;