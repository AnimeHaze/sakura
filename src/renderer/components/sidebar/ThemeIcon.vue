<template>
  <component :is="icon" />
</template>

<script setup>
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useConfigStore } from '../../store'
import { computed } from 'vue'

const icon = computed(() => config.theme === 'dark' ? MoonOutline : SunnyOutline)
const config = useConfigStore()
</script>
