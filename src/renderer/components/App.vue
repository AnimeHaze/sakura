<template>
  <div
    v-show="showMemoryUsage"
    style="position: absolute;top: 18px;right: 21px;width: 200px;background: #70766dad;z-index: 9999999999999;color: #f9f9f9;padding: 10px;border-radius: 5px;"
  >
    <div>Total heap size: {{ totalJSHeapSize }} MB</div>
    <div>Used heap size: {{ usedJSHeapSize }} MB</div>
    <div>Heap size limit: {{ jsHeapSizeLimit }} MB</div>

    <div>Main RSS: {{ mainJsRSS }} MB</div>
  </div>

  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <div
          @contextmenu="handleContextMenu"
          @click="showPopover = false"
        >
          <router-view />
        </div>
        <!--        <search-modal />-->
        <n-popover
          :show-arrow="false"
          placement="bottom-start"
          :theme="theme"
          :show="showPopover"
          :x="x"
          :y="y"
          trigger="manual"
        >
          <div>
            <n-button
              size="small"
              @click="inspectElement()"
            >
              Исследовать
            </n-button>
          </div>
          <div class="mt-3">
            <n-button
              size="small"
              @click="inspectMemoryUsage()"
            >
              {{ showMemoryUsage ? 'Скрыть использование памяти' : 'Показать использование памяти' }}
            </n-button>
          </div>
        </n-popover>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useConfigStore } from '../store'
import { appTheme } from '../../enums'

const showMemoryUsage = ref(false)
const totalJSHeapSize = ref(0)
const usedJSHeapSize = ref(0)
const jsHeapSizeLimit = ref(0)
const mainJsRSS = ref(0)

let memoryUsageInterval = null

const config = useConfigStore()
const theme = computed(() => config.theme === appTheme.DARK ? darkTheme : lightTheme)

function themeChange (event) {
  config.systemThemeColor = event.matches ? appTheme.DARK : appTheme.LIGHT
}

const x = ref(0)
const y = ref(0)
const showPopover = ref(false)

function inspectElement () {
  showPopover.value = false
  window.api.inspectElement(x.value, y.value)
}

function inspectMemoryUsage () {
  showPopover.value = false
  showMemoryUsage.value = !showMemoryUsage.value
}

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

function startMemoryPoll () {
  return setInterval(async () => {
    const { totalJSHeapSize: totalJSHeapSizeTmp, usedJSHeapSize: usedJSHeapSizeTmp, jsHeapSizeLimit: jsHeapSizeLimitTmp } = performance.memory
    totalJSHeapSize.value = (totalJSHeapSizeTmp / (1024 * 1024)).toFixed(2)
    usedJSHeapSize.value = (usedJSHeapSizeTmp / (1024 * 1024)).toFixed(2)
    jsHeapSizeLimit.value = (jsHeapSizeLimitTmp / (1024 * 1024)).toFixed(2)

    const { rss } = await window.api.memoryUsage()
    mainJsRSS.value = (rss / (1024 * 1024)).toFixed(2)
  }, 300)
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')

watch(() => showMemoryUsage.value, (value) => {
  if (value) {
    memoryUsageInterval = startMemoryPoll()
  } else {
    clearInterval(memoryUsageInterval)
  }
}, { immediate: true })

onMounted(() => {
  themeChange(mediaDark)
  mediaDark.addEventListener('change', themeChange)
})

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
  clearInterval(memoryUsageInterval)
})
</script>
