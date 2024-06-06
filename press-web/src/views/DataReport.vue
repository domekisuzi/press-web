<template>
  <div class="data-report">
    <h1>数据日报</h1>
    <el-button type="primary" @click="openDialog">上传数据</el-button>

    <el-dialog v-model="showDialog" title="上传数据" width="50%">
      <el-form :model="form">
        <el-form-item label="心率" :label-width="formLabelWidth">
          <el-input v-model="form.heartRate" type="number"></el-input>
        </el-form-item>
        <el-form-item label="步数" :label-width="formLabelWidth">
          <el-input v-model="form.steps" type="number"></el-input>
        </el-form-item>
        <el-form-item label="距离 (km)" :label-width="formLabelWidth">
          <el-input v-model="form.distance" type="number"></el-input>
        </el-form-item>
        <el-form-item label="卡路里消耗" :label-width="formLabelWidth">
          <el-input v-model="form.caloriesBurned" type="number"></el-input>
        </el-form-item>
        <el-form-item label="血氧 (%)" :label-width="formLabelWidth">
          <el-input v-model="form.spO2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="收缩压" :label-width="formLabelWidth">
          <el-input v-model="form.systolicBp" type="number"></el-input>
        </el-form-item>
        <el-form-item label="舒张压" :label-width="formLabelWidth">
          <el-input v-model="form.diastolicBp" type="number"></el-input>
        </el-form-item>
        <el-form-item label="体温 (°C)" :label-width="formLabelWidth">
          <el-input v-model="form.temperature" type="number"></el-input>
        </el-form-item>
        <el-form-item label="呼吸率" :label-width="formLabelWidth">
          <el-input v-model="form.respiratoryRate" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitData">提交</el-button>
      </span>
    </el-dialog>

    <div class="table-container">
      <el-table :data="paginatedData" style="width: 100%; margin-top: 20px;">
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="heartRate" label="心率" width="120"></el-table-column>
        <el-table-column prop="steps" label="步数" width="120"></el-table-column>
        <el-table-column prop="distance" label="距离 (km)" width="120"></el-table-column>
        <el-table-column prop="caloriesBurned" label="卡路里消耗" width="120"></el-table-column>
        <el-table-column prop="spO2" label="血氧" width="120"></el-table-column>
        <el-table-column prop="systolicBp" label="收缩压" width="120"></el-table-column>
        <el-table-column prop="diastolicBp" label="舒张压" width="120"></el-table-column>
        <el-table-column prop="temperature" label="体温" width="120"></el-table-column>
        <el-table-column prop="respiratoryRate" label="呼吸率" width="120"></el-table-column>
        <el-table-column prop="stressLevel" label="压力等级" width="120">
          <template #default="scope">
            <el-tag :type="getStressLevelType(scope.row.stressLevel)">
              {{ getStressLevelLabel(scope.row.stressLevel) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="advice" label="建议" width="200"></el-table-column>
      </el-table>

      <el-pagination
          layout="total, prev, pager, next, jumper"
          :total="data.length"
          :page-size="pageSize"
          v-model:current-page="currentPage"
          @current-change="handlePageChange"
          style="margin-top: 20px; text-align: center;">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDataStore } from '../store/dataStore.js';
import axios from '../http';
import { useUserStore } from '../store/userStore.js';

const dataStore = useDataStore();
const userStore = useUserStore();
const showDialog = ref(false);
const form = ref({
  heartRate: 70,
  steps: 5000,
  distance: 5,
  caloriesBurned: 200,
  spO2: 98,
  systolicBp: 120,
  diastolicBp: 80,
  temperature: 36.5,
  respiratoryRate: 16,
});
const formLabelWidth = '100px';

const pageSize = ref(10);
const currentPage = ref(1);

const data = computed(() => dataStore.data);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return data.value.slice(start, end);
});

const openDialog = () => {
  showDialog.value = true;
  console.log("Dialog opened");
};

const closeDialog = () => {
  showDialog.value = false;
  console.log("Dialog closed");
};

const submitData = async () => {
  const newEntry = {
    heartRate: parseInt(form.value.heartRate),
    steps: parseInt(form.value.steps),
    distance: parseFloat(form.value.distance),
    caloriesBurned: parseInt(form.value.caloriesBurned),
    spO2: parseInt(form.value.spO2),
    systolicBp: parseInt(form.value.systolicBp),
    diastolicBp: parseInt(form.value.diastolicBp),
    temperature: parseFloat(form.value.temperature),
    respiratoryRate: parseInt(form.value.respiratoryRate),
  };

  try {
    // 调用 Flask 预测接口，确保请求发送到正确的端口号
    const response = await axios.post('http://localhost:5000/predict', [newEntry]);
    const stressLevel = response.data.stress_level;

    newEntry.stressLevel = stressLevel;
    newEntry.date = new Date().toISOString().split('T')[0];
    newEntry.advice = getAdvice(stressLevel);

    // 提交数据到后端 API
    await axios.post('/api/data', newEntry);
    console.log('Data submitted successfully');
    dataStore.addData(newEntry);
    showDialog.value = false;
    resetForm();
  } catch (error) {
    console.error('Error submitting data:', error.response ? error.response.data : error.message);
    alert('数据提交失败');
  }
};

const resetForm = () => {
  form.value = {
    heartRate: 70,
    steps: 5000,
    distance: 5,
    caloriesBurned: 200,
    spO2: 98,
    systolicBp: 120,
    diastolicBp: 80,
    temperature: 36.5,
    respiratoryRate: 16,
  };
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
};

const getStressLevelLabel = (level) => {
  switch (level) {
    case 0:
      return '无压力';
    case 1:
      return '低压力';
    case 2:
      return '中等压力';
    case 3:
      return '高压力';
    default:
      return '';
  }
};

const getStressLevelType = (level) => {
  switch (level) {
    case 0:
      return 'success';
    case 1:
      return 'warning';
    case 2:
      return 'danger';
    case 3:
      return 'danger';
    default:
      return '';
  }
};

const getAdvice = (level) => {
  switch (level) {
    case 0:
      return '保持良好的生活习惯';
    case 1:
      return '保持轻松，继续运动';
    case 2:
      return '注意休息，适当放松';
    case 3:
      return '请注意高压力，尽快寻求专业帮助';
    default:
      return '';
  }
};

onMounted(() => {
  userStore.loadUserData();
});
</script>

<style scoped>
.data-report {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-footer {
  text-align: right;
}

.table-container {
  width: 100%;
  //max-width: 1500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-dialog {
  top: 15vh; /* Adjust top value to ensure it's within the viewport */
}
</style>
