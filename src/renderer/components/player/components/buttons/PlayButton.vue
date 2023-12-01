<script setup>
import Tooltip from '../Tooltip.vue'

/** @type {{tooltipPlacement: import('vidstack').TooltipPlacement}} */
const { tooltipPlacement } = defineProps({
  tooltipPlacement: {
    type: String,
    default: 'bottom'
  }
})
</script>

<template>
  <Tooltip :placement="tooltipPlacement">
    <template #trigger>
      <media-play-button
        class="ring-media-focus relative inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-[60px] outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
      >
        <media-icon
          class="media-paused:block hidden h-8 w-8"
          type="play"
        />
        <media-icon
          class="media-paused:hidden h-8 w-8"
          type="pause"
        />
      </media-play-button>
    </template>

    <template #content>
      <span class="media-paused:block hidden">Play</span>
      <span class="media-paused:hidden">Pause</span>
    </template>
  </Tooltip>
</template>
