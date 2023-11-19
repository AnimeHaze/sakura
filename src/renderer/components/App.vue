<template>
  <memory-widget :show-memory-usage="showMemoryUsage" />

  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <context-menu v-model:show-memory-usage="showMemoryUsage">
          <router-view />
        </context-menu>
        <!--        <search-modal />-->
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { darkTheme, lightTheme } from 'naive-ui'
import { useConfigStore } from '@/store'
import { appTheme } from '@enums/index'
import ContextMenu from './app/ContextMenu.vue'
import MemoryWidget from './app/MemoryWidget.vue'

const showMemoryUsage = ref(false)
const config = useConfigStore()
const theme = computed(() => config.theme === appTheme.DARK ? darkTheme : lightTheme)

function themeChange (event) {
  config.systemThemeColor = event.matches ? appTheme.DARK : appTheme.LIGHT
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')

onMounted(() => {
  themeChange(mediaDark)
  mediaDark.addEventListener('change', themeChange)
})

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
})
</script>

<style scoped>
</style>
