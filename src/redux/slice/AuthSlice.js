import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailed: (state) => {
            state.isFetching = false;
        },
        logoutStart: (state) => {
            state.isFetching = true;
        },
        logoutSucces: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },
        logoutFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logoutStart,
    logoutSucces,
    logoutFailed
} = AuthSlice.actions;

export default AuthSlice.reducer;