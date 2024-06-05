<template>
  <div class="register">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>注册</span>
      </div>
      <el-form :model="form" @submit.prevent="register">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="form.confirmPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
      <p>已有账户？ <router-link to="/login">立即登录</router-link></p>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
});

const register = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('密码和确认密码不一致');
    return;
  }
  try {
    await axios.post('/api/register', form.value);
    alert('注册成功，请登录');
    router.push('/login');
  } catch (error) {
    console.error(error);
    alert('注册失败，请重试');
  }
};
</script>

<style scoped>
.register {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.box-card {
  width: 400px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
