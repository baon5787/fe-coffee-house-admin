
import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSucces: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
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
    loginSucces,
    loginFailed,
    logoutStart,
    logoutSucces,
    logoutFailed
} = authSlice.actions;

export default authSlice.reducer;