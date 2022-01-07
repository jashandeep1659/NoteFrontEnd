import reduxStore from "../store";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
    LOGIN_PAGE_ACTION_ERROR,
    USER_REFRESH_TOKEN,
    USER_STATUS_ACTION,
} from "../actions/index";

import dayjs from "dayjs";
import { ChevronDoubleRightIcon } from "@heroicons/react/solid";

// const baseURL = "http://127.0.0.1:8000";
const baseURL = "https://django-note-testing-01.herokuapp.com";

const { dispatch } = reduxStore;

const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use(
    async (config) => {
        console.log("object");
        let AuthTokens = localStorage.getItem("AuthTokens")
            ? JSON.parse(localStorage.getItem("AuthTokens"))
            : null;
        if (AuthTokens) {
            console.log(AuthTokens);
            const user = jwt_decode(AuthTokens.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (!isExpired) {
                config.headers.Authorization = `Bearer ${AuthTokens.access}`;
                dispatch(USER_STATUS_ACTION(true));
                return config;
            }
            if (isExpired) {
                console.log("isep");
                const response = await axios
                    .post(`${baseURL}/api/token/refresh/`, {
                        refresh: AuthTokens.refresh,
                    })
                    .catch(function (error) {
                        dispatch(USER_STATUS_ACTION(false));
                    });
                localStorage.setItem(
                    "AuthTokens",
                    JSON.stringify(response.data)
                );
                dispatch(USER_STATUS_ACTION(true));
                config.headers.Authorization = `Bearer ${response.data.access}`;
                console.log("mew object");
                return config;
            }
        } else {
            dispatch(USER_STATUS_ACTION(false));
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        // return Promise.reject(error);
        return error;
        if (error.response.status === 401 && error.response) {
            dispatch(LOGIN_PAGE_ACTION_ERROR(error.response.data));
            return error;
        }
        return error;
    }
);
export default axiosInstance;
