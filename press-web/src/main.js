import './assets/main.css'

import { createPinia } from 'pinia'

import  {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import {useUserStore} from "@/store/userStore.js";
import piniaInstance from "@/global.js";



const app = createApp(App)
app.use(piniaInstance)
app.use(ElementPlus)

app.use(router)

// 在应用启动时加载token
// 确保在使用 store 之前已安装 Pinia

app.mount('#app')

const userStore = useUserStore();
userStore.loadToken();