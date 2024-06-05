import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DataReport from '../views/DataReport.vue';
import Reports from '../views/Reports.vue';
import Community from '../views/Community.vue';
import DailyNews from '../views/DailyNews.vue';
import Profile from '../views/Profile.vue';
import MainLayout from '../layouts/MainLayout.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import { useUserStore } from '../store/userStore';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home, meta: { requiresAuth: true } },
      { path: 'data-report', component: DataReport, meta: { requiresAuth: true } },
      { path: 'reports', component: Reports, meta: { requiresAuth: true } },
      { path: 'community', component: Community, meta: { requiresAuth: true } },
      { path: 'daily-news', component: DailyNews, meta: { requiresAuth: true } },
      { path: 'profile', component: Profile, meta: { requiresAuth: true } },
    ],
  },
  {
    path: '/auth',
    component: BlankLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  console.log('Navigating to:', to.path);
  if (to.matched.some(record => record.meta.requiresAuth) && !userStore.token) {
    next('/auth/login');
  } else {
    next();
  }
});

export default router;
