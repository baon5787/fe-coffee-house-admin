import { createSlice } from '@reduxjs/toolkit';

const DimensionsSlice = createSlice({
    name: "dimensions",
    initialState: {
        isDimensions: window.innerWidth < 991,
        isAside: false,
    },
    reducers: {
        updateIsDimensions: (state, action) => {
            if (state.isDimensions !== action.payload) {
                state.isDimensions = action.payload
            }
        },
        toggleMenu: (state) => {
            state.isAside = !state.isAside
        },
    }
});

export const {
    updateIsDimensions,
    toggleMenu,
} = DimensionsSlice.actions;

export default DimensionsSlice.reducer;