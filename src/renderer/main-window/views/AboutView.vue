<template>
  <div class="p-3">
    <div
      class="absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
    >
      <n-space
        class="text-center"
        justify="center"
      >
        <n-space
          vertical
        >
          <div
            :class="{ animate: animate }"
            @click="animate = true"
          >
            <n-image
              :width="170"
              :src="Logo"
              alt=""
            />
          </div>
          <div>
            <div>
              <h1 class="sakura-color font-bold text-2xl">
                桜 SAKURA
              </h1>
              <n-divider />
              <p>
                <b>Версия:</b> {{ meta.version }} (64-разрядный)
              </p>
              <p>
                <b>Разработчик:</b> {{ meta.author.name }}
              </p>
              <p>
                <b>Спасибов за вклад:</b> Senkai
              </p>
            </div>
          </div>
        </n-space>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import meta from '../../../../package.json'
import { ref, watch } from 'vue'
import Logo from '../../../../assets/logo/logo.png'
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

.animate {
  animation: bounce 2s ease-out;
}

@keyframes bounce {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
</style>
