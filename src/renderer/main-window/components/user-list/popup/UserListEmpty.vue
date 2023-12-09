<script setup>
import { SadOutline } from '@vicons/ionicons5'
import { useThemeVars } from 'naive-ui'
const theme = useThemeVars()
</script>

<template>
  <div
    class="text-center"
    :style="{ color: theme.textColorBase }"
  >
    <n-icon
      size="64"
    >
      <sad-outline />
    </n-icon>
    <div>
      Тут ничего нету. Создай папку
    </div>
  </div>
</template>

<style scoped>

</style>
