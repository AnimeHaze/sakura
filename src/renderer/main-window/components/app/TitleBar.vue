<script setup>
import { CloseOutline, RemoveOutline, SquareOutline } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'

const { titleBarDrag } = defineProps({
  titleBarDrag: {
    type: Boolean,
    required: true
  }
})

function closeApp () {
  window.api.closeApp()
}

function maximizeMinimizeApp () {
  window.api.minimizeMaximizeApp()
}

function collapseApp () {
  window.api.collapseApp()
}

const themeVars = useThemeVars()
</script>

<template>
  <div
    :style="{ background: themeVars.bodyColor, 'border-bottom': '1px solid #373737' }"
    class="w-full h-[36px] rounded-tr-lg rounded-tl-lg border border-b-4 border-indigo-500"
    :class="{ 'cursor-move': titleBarDrag }"
    @dblclick="maximizeMinimizeApp"
  >
    <n-space
      justify="end"
    >
      <div class="p-1">
        <n-button
          size="small"
          quaternary
          circle
          @click="collapseApp"
        >
          <template #icon>
            <n-icon size="small">
              <remove-outline />
            </n-icon>
          </template>
        </n-button>

        <n-button
          class="ml-1"
          size="small"
          quaternary
          circle
          @click="maximizeMinimizeApp"
        >
          <template #icon>
            <n-icon size="small">
              <square-outline />
            </n-icon>
          </template>
        </n-button>

        <n-button
          class="ml-1"
          size="small"
          quaternary
          circle
          @click="closeApp"
        >
          <template #icon>
            <n-icon size="medium">
              <close-outline />
            </n-icon>
          </template>
        </n-button>
      </div>
    </n-space>
  </div>
</template>

<style scoped>

</style>
