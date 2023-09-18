<template>
  <div style="position: absolute;top: 18px;right: 21px;width: 200px;background: #70766dad;z-index: 9999999999999;color: #f9f9f9;padding: 10px;border-radius: 5px;">
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
          <default-layout />
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
          <n-button
            size="small"
            @click="inspectElement()"
          >
            Исследовать
          </n-button>
        </n-popover>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useConfigStore } from '../store'
import { appTheme } from '../../enums'

const totalJSHeapSize = ref(0)
const usedJSHeapSize = ref(0)
const jsHeapSizeLimit = ref(0)
const mainJsRSS = ref(0)

const memoryUsageInterval = setInterval(async () => {
  const { totalJSHeapSize: totalJSHeapSizeTmp, usedJSHeapSize: usedJSHeapSizeTmp, jsHeapSizeLimit: jsHeapSizeLimitTmp } = performance.memory
  totalJSHeapSize.value = (totalJSHeapSizeTmp / (1024 * 1024)).toFixed(2)
  usedJSHeapSize.value = (usedJSHeapSizeTmp / (1024 * 1024)).toFixed(2)
  jsHeapSizeLimit.value = (jsHeapSizeLimitTmp / (1024 * 1024)).toFixed(2)

  const { rss } = await window.api.memoryUsage()
  mainJsRSS.value = (rss / (1024 * 1024)).toFixed(2)
}, 300)

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

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')
themeChange(mediaDark)

mediaDark.addEventListener('change', themeChange)

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
})

onMounted(() => {
  clearInterval(memoryUsageInterval)
})
</script>
