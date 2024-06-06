import { defineStore } from 'pinia';
import axios from '../http.js';
import { useDataStore } from './dataStore';  // 确保正确导入数据存储

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || '',
    }),
    actions: {
        async login(userData) {
            try {
                const response = await axios.post('/api/login', userData);
                this.setUser(response.data.user);
                this.setToken(response.data.token);
                await this.loadUserData();  // 登录后加载用户数据
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        logout() {
            this.user = null;
            this.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        async loadUser() {
            if (this.token) {
                try {
                    const response = await axios.get('/api/profile', {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    });
                    this.setUser(response.data.user);
                    // await this.loadUserData();  // 加载用户数据
                } catch (error) {
                    console.error('Failed to load user:', error);
                    this.logout();
                }
            }
        },

        async loadUserData() {
            if(this.token) {
                const dataStore = useDataStore();
                try {
                    const response = await axios.get('/api/data', {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    });
                    dataStore.setData(response.data.data);  // 假设 dataStore 有 setData 方法
                } catch (error) {
                    console.error('Failed to load user data:', error);
                }
            }
        }
    },
});
