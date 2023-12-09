<script setup>
import { darkTheme } from 'naive-ui'
import NotifyView from '../views/NotifyView.vue'

import '../../assets/index.css'
</script>

<template>
  <div>
    <n-config-provider :theme="darkTheme">
      <n-notification-provider placement="bottom-right">
        <notify-view />
      </n-notification-provider>
    </n-config-provider>
  </div>
</template>

<style scoped>

</style>
