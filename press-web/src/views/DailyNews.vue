<template>
  <div>
    <h1>每日医疗新闻</h1>
    <el-card v-for="(news, index) in newsList" :key="index" class="news-card">
      <h3>{{ news.title }}</h3>
      <p>{{ news.content }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DailyNews',
  data() {
    return {
      newsList: [
        { title: '新闻标题1', content: '新闻内容1' },
        { title: '新闻标题2', content: '新闻内容2' },
      ],
    };
  },
};
</script>

<style>
.news-card {
  margin-bottom: 20px;
}
</style>
