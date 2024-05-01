<template>
  <memory-widget :show-memory-usage="showMemoryUsage" />

  <n-config-provider
    :theme="theme"
    :locale="ruRU"
    :date-locale="dateRuRU"
  >
    <title-bar-context-menu>
      <template #default="{ titleBarDrag }">
        <title-bar :title-bar-drag="titleBarDrag" />
      </template>
    </title-bar-context-menu>

    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <context-menu v-model:show-memory-usage="showMemoryUsage">
            <router-view v-show="config.onLine" />
            <offline-layout v-show="!config.onLine" />
          </context-menu>
          <!--        <search-modal />-->
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { darkTheme, lightTheme, ruRU, dateRuRU } from 'naive-ui'

import { useConfigStore } from '@/store'
import { appTheme } from '@enums/index'
import ContextMenu from './app/ContextMenu.vue'
import MemoryWidget from './app/MemoryWidget.vue'
import OfflineLayout from '@/layouts/OfflineLayout.vue'
// import TitleBarContextMenu from '@/components/app/TitleBarContextMenu.vue'
// import TitleBar from '@/components/app/TitleBar.vue'

let onLineInterval = null
const showMemoryUsage = ref(false)
const config = useConfigStore()
const theme = computed(() => config.theme === appTheme.DARK ? darkTheme : lightTheme)

function themeChange (event) {
  config.systemThemeColor = event.matches ? appTheme.DARK : appTheme.LIGHT
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')

onMounted(() => {
  onLineInterval = setInterval(async () => (config.onLine = await window.api.checkOnline()), 1000)

  themeChange(mediaDark)
  mediaDark.addEventListener('change', themeChange)
})

onBeforeUnmount(() => {
  clearInterval(onLineInterval)
  mediaDark.removeEventListener('change', themeChange)
})
</script>

<style scoped>
</style>
