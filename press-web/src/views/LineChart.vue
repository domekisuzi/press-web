<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  data: Array
});

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.data.map((entry, index) => `第${index + 1}项`),
      datasets: [
        {
          label: '压力等级',
          data: props.data.map(entry => entry.stressLevel),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: '数据项'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: '压力等级'
          },
          suggestedMin: 0,
          suggestedMax: 3
        }
      }
    }
  });
});

watch(() => props.data, (newData) => {
  if (chartInstance) {
    chartInstance.data.labels = newData.map((entry, index) => `第${index + 1}项`);
    chartInstance.data.datasets[0].data = newData.map(entry => entry.stressLevel);
    chartInstance.update();
  }
}, { deep: true });
</script>

<style scoped>
canvas {
  width: 100%;
  max-height: 400px;
}
</style>
