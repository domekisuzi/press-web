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
        <el-form-item label="血氧" :label-width="formLabelWidth">
          <el-input v-model="form.spO2" type="number"></el-input>
        </el-form-item>
        <el-form-item label="血压" :label-width="formLabelWidth">
          <el-input v-model="form.bloodPressure"></el-input>
        </el-form-item>
        <el-form-item label="体温" :label-width="formLabelWidth">
          <el-input v-model="form.temperature" type="number"></el-input>
        </el-form-item>
        <el-form-item label="呼吸率" :label-width="formLabelWidth">
          <el-input v-model="form.respiratoryRate" type="number"></el-input>
        </el-form-item>
        <el-form-item label="压力等级" :label-width="formLabelWidth">
          <el-select v-model="form.stressLevel" placeholder="请选择压力等级">
            <el-option label="无压力" value="0"></el-option>
            <el-option label="低压力" value="1"></el-option>
            <el-option label="中等压力" value="2"></el-option>
            <el-option label="高压力" value="3"></el-option>
          </el-select>
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
        <el-table-column prop="spO2" label="血氧" width="120"></el-table-column>
        <el-table-column prop="bloodPressure" label="血压" width="120"></el-table-column>
        <el-table-column prop="temperature" label="体温" width="120"></el-table-column>
        <el-table-column prop="respiratoryRate" label="呼吸率" width="120"></el-table-column>
        <el-table-column prop="stressLevel" label="压力等级" width="120">
          <template #default="scope">
            <el-tag :type="getStressLevelType(scope.row.stressLevel)">
              {{ getStressLevelLabel(scope.row.stressLevel) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="advice" label="建议" width="300"></el-table-column>
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
import { ref, computed } from 'vue';
import { useDataStore } from '../store/dataStore.js';
import axios from '../http';

const dataStore = useDataStore();
const showDialog = ref(false);
const form = ref({
  heartRate: 70, // 默认值
  steps: 5000, // 默认值
  spO2: 98, // 默认值
  bloodPressure: '120/80', // 默认值
  temperature: 36.5, // 默认值
  respiratoryRate: 16, // 默认值
  stressLevel: 1, // 默认值
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
    ...form.value,
    heartRate: parseInt(form.value.heartRate),
    steps: parseInt(form.value.steps),
    spO2: parseInt(form.value.spO2),
    bloodPressure: form.value.bloodPressure,
    temperature: parseFloat(form.value.temperature),
    respiratoryRate: parseInt(form.value.respiratoryRate),
    stressLevel: parseInt(form.value.stressLevel),
    date: new Date().toISOString().split('T')[0],
    advice: getAdvice(parseInt(form.value.stressLevel)),
  };
  console.log("New Entry:", newEntry);
  try {
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
    heartRate: 70, // 默认值
    steps: 5000, // 默认值
    spO2: 98, // 默认值
    bloodPressure: '120/80', // 默认值
    temperature: 36.5, // 默认值
    respiratoryRate: 16, // 默认值
    stressLevel: 1, // 默认值
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
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-dialog {
  top: 15vh; /* Adjust top value to ensure it's within the viewport */
}
</style>
