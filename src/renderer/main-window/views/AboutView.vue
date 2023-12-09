<template>
  <div class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
    <div
      :class="{ animate: animate }"
      class="sakura-logo sakura-color"
      @click="animate = true"
    >
      桜
    </div>
    <h1 class="font-bold text-2xl">
      SAKURA
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
import meta from '../../../../package.json'
import { ref, watch } from 'vue'

const animate = ref(false)

watch(() => animate.value, (value) => {
  if (value) {
    setTimeout(() => (animate.value = false), 2000)
  }
})
</script>

<style scoped>
.sakura-color {
  color: #dfb6c4;
}

.sakura-logo {
  transform: scale(5);
  margin-bottom: 30px;
}

.animate {
  animation: bounce 2s ease-out;
}

@keyframes bounce {
  0% {
    transform: rotate(-10deg) scale(5);
  }
  50% {
    transform: rotate(10deg) scale(5);
  }
  100% {
    transform: rotate(-10deg) scale(5);
  }
}
</style>
