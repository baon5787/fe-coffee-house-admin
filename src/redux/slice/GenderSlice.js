import { createSlice } from "@reduxjs/toolkit";

const GenderSlice = createSlice({
    name: "gender",
    initialState: {
        allGender: [],
        error: false
    },
    reducers: {
        getRadioGenderSuccess: (state, action) => {
            state.allGender = action.payload;
            state.error = false;
        },
        getRadioGenderFailed: (state) => {
            state.error = true;
        }
    }
});

export const {
    getRadioGenderSuccess,
    getRadioGenderFailed,
} = GenderSlice.actions;

export default GenderSlice.reducer;