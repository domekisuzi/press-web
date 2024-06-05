import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || '',
    }),
    actions: {
        async login(userData) {
            try {
                const response = await axios.post('/api/login', userData);
                this.setUser(response.data.user);
                this.setToken(response.data.token);
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },
        setUser(user) {
            this.user = user;
        },
        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        logout() {
            this.user = null;
            this.token = '';
            localStorage.removeItem('token');
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
                } catch (error) {
                    console.error('Failed to load user:', error);
                    this.logout();
                }
            }
        },
    },
});
