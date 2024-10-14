import axios from "axios";
import { config } from "../config/config";

const axiosInstance = axios.create({
    baseURL: config.apiBaseUrl,
    withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             window.location.href = '/login';
//             toast.error('You need to log in to your account again');
//         }

//         return Promise.reject(error);
//     }
// );
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if (error.response?.status === 401) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("account");

            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;