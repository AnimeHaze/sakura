<script setup>
import NotFound from '@assets/SerachNotFound.png'
</script>

<template>
  <div class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
    <n-result
      title="Хмм..."
      description="Что-то ничего не нашлось... Попробуешь что-то другое?"
    >
      <template #icon>
        <img
          class="animate"
          width="200"
          :src="NotFound"
          alt="404"
        >
      </template>
    </n-result>
  </div>
</template>

<style scoped>

</style>
