<template>
  <el-container style="height: 100vh; width: 100vw;">
    <!-- 头部导航栏 -->
    <el-header class="header">
      <div class="header-content">
        <div class="logo">异构物联设备数据包传输的智能归一化算法研究与应用</div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据日报</el-menu-item>
          <el-menu-item index="3">报告</el-menu-item>
<!--          <el-menu-item index="4">社区</el-menu-item>-->
          <el-menu-item index="5">每日医疗新闻</el-menu-item>
        </el-menu>
        <el-dropdown class="user-dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- 主内容区域 -->
    <el-container class="content-container">
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>

    <!-- 页脚 -->
    <el-footer class="footer">
      <span>© 2024 医疗数据管理系统. 版权所有.</span>
    </el-footer>
  </el-container>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';

console.log('MainLayout component rendered');

const activeIndex = ref('1');
const router = useRouter();
const userStore = useUserStore();
const username = computed(()=> userStore.user.username)
const handleSelect = (key) => {
  console.log('Selected menu item:', key);
  activeIndex.value = key;
  router.push(getRoute(key));
};

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout();
    router.push('/auth/login');
  } else if (command === 'profile') {
    router.push('/profile');
  }
};

const getRoute = (index) => {
  switch (index) {
    case '1':
      return '/';
    case '2':
      return '/data-report';
    case '3':
      return '/reports';
    case '4':
      return '/community';
    case '5':
      return '/daily-news';
    default:
      return '/';
  }
};
</script>

<style scoped>


.header {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1000;
}

.header-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  padding: 0 20px;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-top: 60px;
}

.footer {
  width: 100%;
  height: 60px;
  text-align: center;
  background-color: #f5f5f5;
  line-height: 60px;
  color: #999;
}
</style>
