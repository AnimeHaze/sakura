<template>
  <default-layout />
</template>

<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useConfigStore } from '../store'
import { onBeforeUnmount } from 'vue'
import { appTheme } from '../../enums'

const config = useConfigStore()

function themeChange (event) {
  config.systemThemeColor = event.matches ? appTheme.DARK : appTheme.LIGHT
}

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)')
themeChange(mediaDark)

mediaDark.addEventListener('change', themeChange)

onBeforeUnmount(() => {
  mediaDark.removeEventListener('change', themeChange)
})
</script>
