<template>
  <div class="home">
    <el-row :gutter="20" class="content">
      <el-col :span="16">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>欢迎来到健康管理系统</span>
          </div>
          <div class="welcome">
            <p>你好，用户！欢迎回来。以下是你的最新健康数据和建议。</p>
          </div>
          <el-divider></el-divider>
          <h3>健康数据概览</h3>
          <line-chart :data="recentData"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>健康小贴士</span>
          </div>
          <div class="tips">
            <p>保持良好的饮食习惯，定期锻炼，充足的睡眠有助于减轻压力。</p>
            <p>尝试深呼吸和冥想来放松自己。</p>
          </div>
        </el-card>
        <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <span>重要公告</span>
          </div>
          <div class="announcements">
            <p>2024年6月10日 - 新的健康活动上线，快来参与吧！</p>
            <p>2024年6月15日 - 系统维护通知，预计停机时间为晚上10点到12点。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="quick-actions" style="margin-top: 20px;">
<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="goToDataReport" class="action-button">上传数据</el-button>-->
<!--      </el-col>-->
      <el-col :span="6">
        <el-button type="primary" @click="goToReports" class="action-button">查看报告</el-button>
      </el-col>
<!--      <el-col :span="6">-->
<!--        <el-button type="primary" @click="goToCommunity" class="action-button">进入社区</el-button>-->
<!--      </el-col>-->

      <el-col :span="6">
        <el-button type="primary" @click="goToTips" class="action-button">了解更多</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { useDataStore } from '../store/dataStore.js';
import LineChart from './LineChart.vue';

const router = useRouter();
const dataStore = useDataStore();

const recentData = computed(() => dataStore.recentSevenEntries);

const goToTips = () => {
  router.push('/daily-news');
};

const goToReports = () => {
  router.push('/reports');
};

const goToDataReport = () => {
  router.push('/data-report');
};

const goToCommunity = () => {
  router.push('/community');
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.content {
  display: flex;
  justify-content: space-between;
}

.box-card {
  width: 100%;
}

.quick-actions {
  display: flex;
  justify-content: space-around;
}

.action-button {
  width: 100%;
}

.welcome {
  font-size: 16px;
  margin-bottom: 20px;
}

.tips, .announcements {
  font-size: 14px;
}
</style>
