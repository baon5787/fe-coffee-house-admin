import axios from "axios";
import { loginSucces } from "./redux/authSlice";
import jwt_decode from "jwt-decode";

export const instance = axios.create({
    baseURL: `http://localhost:8080/`,
    headers: {
        "Content-Type": "application/json"
    }
});

const refreshToken = async (navigate) => {
    try {
        const res = await instance("/api/admin/auth/refresh", {
            method: "POST",
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        loginSucces();
        navigate("/login");
        console.log(error);
    }
}

export const createAxios = (user, dispatch, stateSucces, navigate) => {
    const newInstance = axios.create({
        baseURL: `http://localhost:8080/`,
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decoedToken = jwt_decode(user?.accessToken);
            if (decoedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken(navigate);

                const refreshUser = {
                    ...user,
                    accessToken: data.accessToken
                }
                dispatch(stateSucces(refreshUser));
                config.headers["Authorization"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }
    );
    return newInstance;
}