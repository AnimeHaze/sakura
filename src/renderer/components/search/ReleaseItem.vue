<template>
  <div class="ml-2 mt-4 flex inline-flex cursor-pointer">
    <div
      class="w-160px h-226px relative"
    >
      <NImage
        class="w-160px h-226px"
        :src="titleData.image"
      />
      <n-tag
        :bordered="false"
        type="success"
        class="absolute right-0 z-10 bottom-0"
        :color="{color: 'rgba(99, 226, 183, 0.7)', textColor: '#ffffff'}"
      >
        {{ titleData.score }}
        <template #icon>
          <n-icon
            size="16"
            :component="Star"
          />
        </template>
      </n-tag>
    </div>
    <div class="ml-2 max-h-262px">
      <div class="break-words font-600 text-xl anime-clickable-text">
        {{ titleData.main_name }}
      </div>
      <div class="break-words text-gray-500 font-300 text-l">
        {{ titleData.additional_name }}
      </div>
      <div class="flex flex-row mt-2 overflow-ellipsis">
        <n-tag
          v-for="genre in titleData.genres"
          :key="genre"
          :bordered="false"
          type="success"
          class="mr-2 rounded"
          :color="{color: 'rgba(99, 226, 183, 0.7)', textColor: '#ffffff'}"
        >
          {{ genre }}
        </n-tag>
      </div>
      <div class="mt-2 text-gray-500 SmallDescription">
        {{ titleData.description }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { Star } from '@vicons/ionicons5'
defineProps({
  titleData: {
    type: Object,
    required: true
  }
})</script>

<style scoped>

</style>
