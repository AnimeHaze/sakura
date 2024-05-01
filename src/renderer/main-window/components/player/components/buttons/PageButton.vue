<script setup>
import Tooltip from '../Tooltip.vue'

/** @type {{tooltipPlacement: import('vidstack').TooltipPlacement}} */
const { tooltipPlacement, poster } = defineProps({
  tooltipPlacement: {
    type: String,
    default: 'bottom'
  },
  poster: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: false
  }
})
</script>

<template>
  <Tooltip :placement="tooltipPlacement">
    <template #trigger>
      <div
        class="ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
      >
        <n-image
          v-if="!icon"
          lazy
          :src="poster"
          :show-toolbar="false"
          :img-props="{ class: 'h-8 w-8', style: 'border-radius: 0.25rem' }"
        >
          <template #placeholder>
            <n-skeleton
              class="h-8 w-8"
              style="border-radius: 0.25rem"
            />
          </template>
        </n-image>

        <n-icon
          v-else
          :size="24"
        >
          <component :is="icon" />
        </n-icon>
      </div>
    </template>

    <template #content>
      <span>К релизу</span>
    </template>
  </Tooltip>
</template>
