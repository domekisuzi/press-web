import axios from 'axios';
import { useUserStore } from './store/userStore';
import piniaInstance from "@/global.js";

const axiosInstance = axios.create({
    baseURL: '/api',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const userStore = useUserStore(piniaInstance);
        const token = userStore.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`Sending request to ${config.url} with method ${config.method}`);
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Received response:', response);
        return response;
    },
    (error) => {
        console.error('Error in response:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
