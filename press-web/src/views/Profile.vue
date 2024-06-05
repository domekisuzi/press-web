<template>
  <div class="profile-page">
    <el-card class="profile-card">
      <div slot="header" class="header">
        <span>个人信息</span>
      </div>
      <el-form :model="profileForm" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="profileForm.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="电子邮件">
          <el-input v-model="profileForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="profileForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateProfile">更新信息</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '../store/userStore';

const userStore = useUserStore();
const profileForm = reactive({
  username: '',
  email: '',
  phone: '',
});

const loadUserProfile = () => {
  if (userStore.user) {
    profileForm.username = userStore.user.username;
    profileForm.email = userStore.user.email || '';
    profileForm.phone = userStore.user.phone || '';
  }
};

onMounted(() => {
  if (!userStore.user) {
    userStore.loadUser().then(loadUserProfile);
  } else {
    loadUserProfile();
  }
});

const updateProfile = () => {
  // 处理更新个人信息的逻辑
  console.log('Updating profile:', profileForm);
};
</script>

<style scoped>
.profile-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.profile-card {
  width: 400px;
  padding: 20px;
}
</style>
