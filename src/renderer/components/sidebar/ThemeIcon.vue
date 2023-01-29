<template>
  <component :is="icon" />
</template>

<script setup>
import { MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useConfigStore } from '../../store'
import { computed } from 'vue'
import { appTheme } from '../../../enums'

const icon = computed(() => config.theme === appTheme.DARK ? MoonOutline : SunnyOutline)
const config = useConfigStore()
</script>
