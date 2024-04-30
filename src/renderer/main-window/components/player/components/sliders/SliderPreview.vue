<script setup>
const { thumbnails, noClamp = false } = defineProps({
  thumbnails: String,
  noClamp: Boolean
})
</script>

<template>
  <media-slider-preview
    class="flex flex-col items-center opacity-0 transition-opacity duration-200 data-[visible]:opacity-100"
    :no-clamp="noClamp"
  >
    <media-slider-thumbnail
      v-if="thumbnails"
      class="block h-[var(--thumbnail-height)] max-h-[160px] min-h-[80px] w-[var(--thumbnail-width)] min-w-[120px] max-w-[180px] overflow-hidden border border-white bg-black"
      :src="thumbnails"
    />

    <slot />
  </media-slider-preview>
</template>
