import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            msg: ""
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.error = true;
            state.login.msg = action.payload;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSucces: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
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