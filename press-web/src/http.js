import axios from 'axios';
import { useUserStore } from './store/userStore';
import piniaInstance from "@/global.js";


// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: '/api', // 确保使用相对路径 /api
});

// 添加请求拦截器
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

// 添加响应拦截器
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
