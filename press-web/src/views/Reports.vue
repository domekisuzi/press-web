<template>
  <div class="reports">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>数据报告</span>
      </div>
      <div v-if="averageStressLevel !== null">
        <p>最近7项数据的平均压力等级：<strong>{{ getStressLevelLabel(averageStressLevel) }}</strong></p>
        <el-card shadow="hover" class="report-card">
          <div v-html="getReportContent(averageStressLevel)"></div>
          <el-divider></el-divider>
          <h3>进度跟踪</h3>
          <line-chart :data="recentData"></line-chart>
          <el-divider></el-divider>
          <h3>自我评估问卷</h3>
          <el-form :model="selfAssessmentForm">
            <el-form-item label="你感觉最近的压力主要来自于？">
              <el-input v-model="selfAssessmentForm.stressSource"></el-input>
            </el-form-item>
            <el-form-item label="你通常如何应对压力？">
              <el-input v-model="selfAssessmentForm.copingStrategy"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitSelfAssessment">提交评估</el-button>
          </el-form>
          <el-divider></el-divider>
          <h3>资源和工具链接</h3>
          <ul>
            <li><a href="https://www.example.com/meditation">冥想练习</a></li>
            <li><a href="https://www.example.com/relaxation">放松练习音频</a></li>
            <li><a href="https://www.example.com/resources">在线心理健康资源</a></li>
          </ul>
        </el-card>
      </div>
      <div v-else>
        <p>暂无数据报告</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDataStore } from '../store/dataStore.js';
import LineChart from './LineChart.vue';

const dataStore = useDataStore();
const averageStressLevel = computed(() => dataStore.averageStressLevel);
const recentData = computed(() => dataStore.recentSevenEntries);

const selfAssessmentForm = ref({
  stressSource: '',
  copingStrategy: '',
});

const submitSelfAssessment = () => {
  console.log("自我评估提交", selfAssessmentForm.value);
  // 这里可以添加将评估结果发送到服务器或存储在本地的逻辑
};

const getStressLevelLabel = (level) => {
  switch (level) {
    case 0: return '无压力';
    case 1: return '低压力';
    case 2: return '中等压力';
    case 3: return '高压力';
    default: return '';
  }
};

const getReportContent = (level) => {
  switch (level) {
    case 0:
      return `<h2>无压力报告</h2>
              <p>恭喜你，你的压力水平非常低。请继续保持健康的生活方式和习惯。</p>
              <ul>
                <li>保持良好的饮食习惯</li>
                <li>定期锻炼</li>
                <li>保持充足的睡眠</li>
                <li>保持积极的心态</li>
              </ul>
              <h3>健康建议</h3>
              <p>虽然你当前的压力水平很低，但仍然要注意保持健康的生活习惯，以预防未来可能的压力。</p>`;
    case 1:
      return `<h2>低压力报告</h2>
              <p>你的压力水平较低，请注意保持当前的生活习惯，以防压力增加。</p>
              <ul>
                <li>适当休息，避免过度劳累</li>
                <li>进行轻松的运动，如散步或瑜伽</li>
                <li>保持良好的饮食习惯</li>
                <li>定期与朋友和家人交流</li>
              </ul>
              <h3>放松技巧</h3>
              <p>尝试一些放松技巧，如深呼吸、冥想或温水浴，以进一步降低压力。</p>`;
    case 2:
      return `<h2>中等压力报告</h2>
              <p>你的压力水平适中，建议你采取一些措施来减轻压力。</p>
              <ul>
                <li>尝试深呼吸和冥想</li>
                <li>进行适量的运动</li>
                <li>安排时间进行放松和娱乐活动</li>
                <li>与朋友和家人交流，寻求支持</li>
              </ul>
              <h3>应对策略</h3>
              <p>识别压力源并采取行动，避免让压力进一步影响你的生活。</p>`;
    case 3:
      return `<h2>高压力报告</h2>
              <p>你的压力水平较高，请尽快采取措施来减轻压力，必要时寻求专业帮助。</p>
              <ul>
                <li>进行深呼吸和放松练习</li>
                <li>尝试冥想或瑜伽</li>
                <li>减少工作压力，合理安排时间</li>
                <li>与朋友和家人交流，寻求支持</li>
                <li>必要时咨询心理医生或专业人士</li>
              </ul>
              <h3>专业建议</h3>
              <p>如果你觉得自己难以应对高压力，建议你咨询心理医生或专业人士，获得专业的帮助。</p>`;
    default:
      return `<p>无数据报告</p>`;
  }
};
</script>

<style scoped>
.reports {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.box-card {
  width: 80%;
}

.report-card {
  margin-top: 20px;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
