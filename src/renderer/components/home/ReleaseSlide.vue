<template>
  <n-tooltip
    :delay="1200"
    placement="bottom"
    trigger="hover"
  >
    <template #trigger>
      <div
        class="poster"
        @click="openRelease(id)"
      >
        <img
          :alt="names.ru"
          :src="posters.medium"
        >
        <div
          class="poster-title"
        >
          {{ names.ru }}
        </div>
      </div>
    </template>
    <span>{{ names.ru }}</span>
  </n-tooltip>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import 'swiper/css'

defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  names: {
    type: Object,
    required: true
  },
  posters: {
    type: Object,
    required: true
  }
})

const $emit = defineEmits(['open-release'])

function openRelease (id) {
  $emit('open-release', id)
}

</script>

<style scoped>
.poster {
  text-align: center;
  width: 120px;
}

.poster > img {
  border: 1px solid rgb(108 108 108 / 36%);
  pointer-events: auto;
  object-fit: cover;
  border-radius: 6px;
  width: 120px;
  height: 180px;
  opacity: 0.7;
  transition: opacity 125ms ease-in-out;
}

.poster > img:hover {
  opacity: 1;
}

.poster-title {
  color: #666666;
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.7);
  align-self: center;
  max-width: 120px;
}
</style>
