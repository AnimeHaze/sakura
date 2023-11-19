<script setup>
import NotFound from '../../../assets/404.png'
</script>

<template>
  <div class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
    <n-result
      title="404"
      description="А что это ты тут делаешь? Такой страницы нет..."
    >
      <template #icon>
        <img
          width="200"
          :src="NotFound"
          alt="404"
        >
      </template>
      <template #footer>
        <n-button @click="$router.back()">
          Назад
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>

</style>
