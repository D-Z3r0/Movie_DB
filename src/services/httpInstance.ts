import { error } from "console";
import Config from "../config";
import axios from "axios";

const httpInstance = axios.create({
    baseURL: Config.API_URL,
});

httpInstance.interceptors.request.use(
    async(config) => {
        const newConfig = { ...config };
        // newConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        // newConfig.headers["X-Version"] = "1.0.0";
        // newConfig.headers["X-Signature"] = "1234567890";
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

httpInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default httpInstance;