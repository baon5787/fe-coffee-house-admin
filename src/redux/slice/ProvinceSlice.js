import { createSlice } from "@reduxjs/toolkit";
import { EMPTY_ARRAY } from "~/constants/AppConstant";

const ProvinceSlice = createSlice({
    name: "province",
    initialState: {
        allProvince: EMPTY_ARRAY,
        error: false
    },
    reducers: {
        getSelectProvinceSuccess: (state, action) => {
            state.allProvince = action.payload;
            state.error = false;
        },
        getSelectProvinceFailed: (state) => {
            state.error = true;
        }
    }
});

export const {
    getSelectProvinceSuccess,
    getSelectProvinceFailed,
} = ProvinceSlice.actions;

export default ProvinceSlice.reducer;

