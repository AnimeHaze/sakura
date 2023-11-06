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
      <media-toggle-button
        class="ring-media-focus relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
      >
        <media-icon
          class="h-8 w-8"
          type="next"
        />
      </media-toggle-button>
    </template>

    <template #content>
      <span>Вперед</span>
    </template>
  </Tooltip>
</template>
