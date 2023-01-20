<template>
  <div class="container">
    <last-releases />
    <news />
  </div>
</template>

<script setup>
import LastReleases from '../components/home/LastReleases.vue'
import News from '../components/home/HomeNews.vue'
</script>

<style scoped>
.container {
  margin-top: 15px;
  padding: 0 19px 19px;
}
</style>
