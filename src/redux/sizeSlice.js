import { createSlice } from "@reduxjs/toolkit";

const sizeSlice = createSlice({
    name: "size",
    initialState: {
        sizes: {
            sizeAll: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        getSizeStart: (state) => {
            state.sizes.isFetching = true;
        },
        getSizeSucces: (state, action) => {
            state.sizes.isFetching = false;
            state.sizes.sizeAll = action.payload;
            state.sizes.error = false;
        },
        getSizeFailed: (state) => {
            state.sizes.isFetching = false;
            state.sizes.error = true;
        }
    }
});

export const {
    getSizeStart,
    getSizeSucces,
    getSizeFailed,
} = sizeSlice.actions;

export default sizeSlice.reducer;