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
        restartStatus: (state) => {
            state.allStatus = EMPTY_ARRAY;
        },
        setStatusesSucces: (state, action) => {
            state.allStatus = action.payload;
        },
    }
});

export const {
    restartStatus,
    setStatusesSucces,
} = StatusSlice.actions;

export default StatusSlice.reducer;