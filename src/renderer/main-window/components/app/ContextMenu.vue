<script setup>
import {
  ArrowBackOutline,
  ArrowForwardOutline,
  CodeSlashOutline,
  HardwareChipOutline,
  RefreshOutline
} from '@vicons/ionicons5'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  showMemoryUsage: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:showMemoryUsage'])

const showMemoryUsage = computed({
  set: value => {
    emit('update:showMemoryUsage', value)
  },
  get: () => {
    return props.showMemoryUsage
  }
})

function historyBack () {
  router.back()
  showPopover.value = false
}

function historyForward () {
  router.forward()
  showPopover.value = false
}

function reload () {
  window.location.reload()
}

function inspectElement () {
  showPopover.value = false
  window.api.inspectElement(x.value, y.value)
}

function inspectMemoryUsage () {
  showPopover.value = false
  showMemoryUsage.value = !showMemoryUsage.value
}

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

function handleContextMenu (event) {
  if (showPopover.value) {
    showPopover.value = true
    x.value = event.clientX
    y.value = event.clientY
  } else {
    showPopover.value = true
    x.value = event.clientX
    y.value = event.clientY
  }
}
</script>

<template>
  <div
    @contextmenu="handleContextMenu"
    @click="showPopover = false"
  >
    <slot name="default" />
  </div>
  <n-popover
    :show-arrow="false"
    placement="bottom-start"
    :show="showPopover"
    :x="x"
    :y="y"
    trigger="manual"
  >
    <n-space>
      <n-button
        circle
        type="primary"
        @click="historyBack"
      >
        <template #icon>
          <n-icon>
            <arrow-back-outline />
          </n-icon>
        </template>
      </n-button>
      <n-button
        circle
        type="primary"
        @click="historyForward"
      >
        <template #icon>
          <n-icon>
            <arrow-forward-outline />
          </n-icon>
        </template>
      </n-button>

      <n-button
        circle
        type="primary"
        @click="reload"
      >
        <template #icon>
          <n-icon>
            <refresh-outline />
          </n-icon>
        </template>
      </n-button>
    </n-space>
    <n-divider class="n-divider" />
    <div class="mt-2">
      <n-button
        class="w-full"
        size="small"
        @click="inspectElement()"
      >
        <template #icon>
          <n-icon>
            <code-slash-outline />
          </n-icon>
        </template>
        Исследовать
      </n-button>
    </div>
    <div class="mt-3">
      <n-button
        class="w-full"
        size="small"
        @click="inspectMemoryUsage()"
      >
        <template #icon>
          <n-icon>
            <hardware-chip-outline />
          </n-icon>
        </template>

        {{ showMemoryUsage ? 'Скрыть использование памяти' : 'Показать использование памяти' }}
      </n-button>
    </div>
  </n-popover>
</template>

<style scoped>
.n-divider:not(.n-divider--vertical) {
  margin-top: 8px;
  margin-bottom: 13px;
}
</style>
