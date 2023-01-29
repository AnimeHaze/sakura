<template>
  <default-layout />
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useConfigStore } from '../store'
import { onBeforeUnmount } from 'vue'

const config = useConfigStore()

function themeChange (event) {
  config.systemThemeColor = event.matches ? 'dark' : 'light'
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')
themeChange(mediaDark)

mediaDark.addEventListener('change', themeChange)

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
})
</script>
