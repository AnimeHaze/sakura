<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const totalJSHeapSize = ref(0)
const usedJSHeapSize = ref(0)
const jsHeapSizeLimit = ref(0)
const mainJsRSS = ref(0)

let memoryUsageInterval = null

const props = defineProps({
  showMemoryUsage: {
    type: Boolean,
    default: false
  }
})

function startMemoryPoll () {
  const calc = value => (value / (1024 * 1024))
    .toFixed(2)

  return setInterval(async () => {
    const { totalJSHeapSize: totalJSHeapSizeTmp, usedJSHeapSize: usedJSHeapSizeTmp, jsHeapSizeLimit: jsHeapSizeLimitTmp } = performance.memory
    totalJSHeapSize.value = calc(totalJSHeapSizeTmp)
    usedJSHeapSize.value = calc(usedJSHeapSizeTmp)
    jsHeapSizeLimit.value = calc(jsHeapSizeLimitTmp)

    const { rss } = await window.api.memoryUsage()
    mainJsRSS.value = calc(rss)
  }, 300)
}

watch(() => props.showMemoryUsage, (value) => {
  if (value) {
    memoryUsageInterval = startMemoryPoll()
  } else {
    clearInterval(memoryUsageInterval)
  }
}, { immediate: true })

onBeforeUnmount(() => clearInterval(memoryUsageInterval))
</script>

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
</template>

<style scoped>

</style>
