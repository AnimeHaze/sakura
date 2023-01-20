<template>
  <div class="container">
    <div class="info">
      <div class="sakura-logo sakura-color">
        桜
      </div>
      <h1>Sakura</h1>
      <p>
        <b>Версия:</b> {{ meta.version }} (64-разрядный)
      </p>
      <p>
        <b>Разработчик:</b> {{ meta.author.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import meta from '../../../package.json'
</script>

<style scoped>
.container {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.info {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
