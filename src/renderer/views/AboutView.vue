<template>
  <div class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
    <div class="sakura-logo sakura-color">
      桜
    </div>
    <h1 class="font-bold text-2xl">
      Sakura
    </h1>
    <n-divider />
    <p>
      <b>Версия:</b> {{ meta.version }} (64-разрядный)
    </p>
    <p>
      <b>Разработчик:</b> {{ meta.author.name }}
    </p>
  </div>
</template>

<script setup>
import meta from '../../../package.json'
</script>
