import { createSlice } from "@reduxjs/toolkit";

const DimensionsSlice = createSlice({
    name: "dimensions",
    initialState: {
        isDimensions: window.innerWidth < 991,
        isSideBar: false,
    },
    reducers: {
        updateIsDimensions: (state, action) => {
            if (state.isDimensions !== action.payload) {
                state.isDimensions = action.payload
            }

            if (state.isSideBar) {
                state.isSideBar = !state.isSideBar
            }
        },
        toggleMenu: (state) => {
            state.isSideBar = !state.isSideBar
        },
    }
});

export const {
    updateIsDimensions,
    toggleMenu,
} = DimensionsSlice.actions;

export default DimensionsSlice.reducer;