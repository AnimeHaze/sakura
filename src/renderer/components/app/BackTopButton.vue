<script setup>
import { ChevronUpOutline } from '@vicons/ionicons5'
</script>

<template>
  <n-back-top
    :bottom="20"
    :right="20"
    :visibility-height="500"
    :style="{
      transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
    }"
  >
    <n-icon>
      <chevron-up-outline />
    </n-icon>
  </n-back-top>
</template>

<style scoped>

</style>
