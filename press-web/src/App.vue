<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-image: url('@/assets/background.svg');
  background-size: cover;
  background-position: center;
}
</style>
