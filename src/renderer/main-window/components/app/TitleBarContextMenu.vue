<script setup>
import { ArrowUpOutline } from '@vicons/ionicons5'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

/** @type {import('vue').Ref<HTMLElement>} */
const titleBarRef = ref(null)
/** @type {import('vue').Ref<HTMLElement>} */
const popoverRef = ref(null)
const titleBarDrag = ref(false)

let refMouseX = 0
let refMouseY = 0
let refAnimationId = 0
onMounted(() => titleBarRef.value.addEventListener('mousedown', onMouseDown))
onBeforeUnmount(() => titleBarRef.value.removeEventListener('mousedown', onMouseDown))

function sendPosition () {
  window.api.moveWindow(refMouseX, refMouseY)
  refAnimationId = requestAnimationFrame(sendPosition)
}

function onMouseDown (event) {
  if (event.button !== 0) return
  refMouseX = event.clientX
  refMouseY = event.clientY
  titleBarDrag.value = true

  document.addEventListener('mouseup', onMouseUp)
  refAnimationId = requestAnimationFrame(sendPosition)
}

function onMouseUp (event) {
  if (event.button !== 0) return

  document.removeEventListener('mouseup', onMouseUp)
  cancelAnimationFrame(refAnimationId)
  titleBarDrag.value = false
}

function hideOnClickOutside (event) {
  let targetEl = event.target
  do {
    if (targetEl === popoverRef.value || targetEl === popoverRef.value?.parentElement?.parentElement) {
      // This is a click inside, does nothing, just return.
      return
    }
    // Go up the DOM
    targetEl = targetEl.parentNode
  } while (targetEl)

  showPopover.value = false

  document.removeEventListener('click', hideOnClickOutside)
}

function handleContextMenu (event) {
  document.removeEventListener('click', hideOnClickOutside)
  showPopover.value = true
  x.value = event.clientX
  y.value = event.clientY

  document.addEventListener('click', hideOnClickOutside)
}

function hideOnSelect () {
  setTimeout(() => (showPopover.value = false), 300)
}
</script>

<template>
  <div
    ref="titleBarRef"
    @click="showPopover = false"
    @contextmenu="handleContextMenu"
  >
    <slot
      :title-bar-drag="titleBarDrag"
      name="default"
    />
  </div>
  <n-popover
    class="app-no-drag"
    :show-arrow="false"
    placement="bottom-start"
    :show="showPopover"
    :x="x"
    :y="y"
    trigger="manual"
  >
    <div ref="popoverRef">
      <n-space
        item-style="display: flex;"
        vertical
      >
        <n-checkbox
          value="alwaysOnTop"
          label="Всегда сверху"
          @update-checked="hideOnSelect"
        >
          <template #icon>
            <n-icon>
              <arrow-up-outline />
            </n-icon>
          </template>
        </n-checkbox>

        <n-checkbox
          value="alwaysOnTop"
          label="Всегда на видимом рабочем столе"
          @update-checked="hideOnSelect"
        >
          <template #icon>
            <n-icon>
              <arrow-up-outline />
            </n-icon>
          </template>
        </n-checkbox>
      </n-space>
    </div>
  </n-popover>
</template>

<style scoped>
</style>
