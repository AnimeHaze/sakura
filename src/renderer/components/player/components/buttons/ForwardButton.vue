<script setup>
import { ref, computed } from 'vue'
/** @type {{tooltipPlacement: string, showTooltip: boolean|undefined}} */
const props = defineProps({
  tooltipPlacement: {
    type: String,
    default: 'bottom'
  },
  showTooltip: {
    type: [Boolean, undefined],
    default: undefined
  },
  footerText: {
    type: String,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})

const tooltipShowHover = ref(false)
const showTooltip = computed(() => {
  return props.showTooltip ? tooltipShowHover.value : false
})

defineEmits(['openForward'])
</script>

<template>
  <n-tooltip
    :show-arrow="false"
    trigger="manual"
    :show="showTooltip"
    :placement="tooltipPlacement"
  >
    <template #trigger>
      <div
        :class="{ disabled }"
        class="ring-media-focus relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl outline-none ring-inset hover:bg-white/20 data-[focus]:ring-4"
        @mouseover="tooltipShowHover = true"
        @mouseleave="tooltipShowHover = false"
        @click="$emit('openForward')"
      >
        <media-icon
          class="h-8 w-8"
          type="next"
        />
      </div>
    </template>

    <template #header>
      <n-text
        strong
        depth="1"
      >
        Вперед
      </n-text>
    </template>

    <template
      v-if="footerText"
      #footer
    >
      {{ footerText }}
    </template>
  </n-tooltip>
</template>

<style scoped>
.disabled {
  color: rgb(119 115 115 / 70%);
  pointer-events: none
}
</style>
