import axios from "axios"
import jwt_decode from "jwt-decode";
import { loginSucces } from "~/redux/slice/AuthSlice";

export const headers = (accesToken) => {
    return {
        headers: { 'Authorization': `Bearer ${accesToken}` },
    }
}

export const headersPostAndPut = (accesToken) => {
    return {
        headers: {
            'Authorization': `Bearer ${accesToken}`,
            'Content-Type': 'application/json'
        },
    }
}

export const headersAndCancelToken = (accesToken, cancelToken) => {
    return {
        headers: { 'Authorization': `Bearer ${accesToken}` },
        cancelToken: cancelToken.token,
    }
}

export const headersPostAndPutImage = (accesToken) => {
    return {
        headers: {
            'Authorization': `Bearer ${accesToken}`,
            'Content-Type': 'multipart/form-data'
        },
    }
}

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

const refreshToken = async (navigate) => {
    try {
        const res = await axiosClient("/auth/refresh", {
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
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
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
            navigate('/login')
            return Promise.reject(error)
        }
    );
    return newInstance;
}