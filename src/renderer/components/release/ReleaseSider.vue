<template>
  <div>
    <n-image
      class="poster mb-3 mt-4"
      round
      lazy
      :src="posterImage"
      :preview-src="posterImageFull ?? posterImage"
      :show-toolbar="false"
      :img-props="{ style: 'max-width: 100%;' }"
    >
      <template #placeholder>
        <n-skeleton
          :height="321"
          :width="224"
          :sharp="false"
          size="medium"
        />
      </template>
    </n-image>

    <n-button
      v-if="!!activeEpisode"
      strong
      secondary
      type="primary"
      class="w-full mb-3"
      @click="$router.push({ name: 'Player', params: { episode: activeEpisode.id } })"
    >
      Смотреть с {{ activeEpisode.number }} серии
    </n-button>

    <n-button
      v-else
      class="w-full mb-3"
    >
      Смотреть
    </n-button>

    <user-list-select />
  </div>
</template>

<script setup>
import UserListSelect from '../user-list/popup/UserListSelect.vue'

defineProps({
  posterImage: {
    type: String,
    required: true
  },
  posterImageFull: {
    type: String,
    required: false,
    default: null
  },
  activeEpisode: {
    type: Object,
    required: false
  }
})
</script>

<style scoped>
.poster {
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
  border-radius: 4px;
  transition: opacity 125ms ease-in-out;
}

.poster:hover {
  opacity: 1;
}
</style>
