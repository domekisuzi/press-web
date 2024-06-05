<template>
  <div class="login-page">
    <el-card class="login-card">
      <div slot="header" class="login-header">
        <h2>登录</h2>
      </div>
      <el-form :model="form" @submit.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <p>还没有账户？ <router-link to="auth/register">立即注册</router-link></p>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../http';
import { useUserStore } from '../store/userStore';

const router = useRouter();
const userStore = useUserStore();
const form = ref({
  username: '',
  password: '',
});

const login = async () => {
  try {
    const response = await axios.post('/api/login', form.value);
    userStore.setUser(response.data.user);
    userStore.setToken(response.data.token);
    router.push('/');
  } catch (error) {
    console.error(error);
    alert('登录失败，请检查用户名和密码');
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  width: 400px;
}

.login-header {
  text-align: center;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
