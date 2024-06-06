<template>
  <div>
    <h1>每日医疗新闻</h1>
    <el-card v-for="(news, index) in newsList" :key="index" class="news-card">
      <h3><a :href="news.url" target="_blank">{{ news.url }}</a></h3>
      <p>{{ news.content }}</p>
    </el-card>
  </div>
</template>

<script>
import axios from '../http';

export default {
  name: 'DailyNews',
  data() {
    return {
      newsList: [],
    };
  },
  created() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get('/api/news');
        this.newsList = response.data;
      } catch (error) {
        console.error('Error fetching news:', error);
        alert('获取新闻数据失败');
      }
    },
  },
};
</script>

<style>
.news-card {
  margin-bottom: 20px;
}
</style>
