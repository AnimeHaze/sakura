<template>
  <n-config-provider :theme="theme">
    <n-dialog-provider>
      <n-message-provider>
        <n-layout
          class="h-screen select-none"
          has-sider
        >
          <Sidebar />
          <n-layout>
            <transition name="fade">
              <router-view />
            </transition>
          </n-layout>
        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { darkTheme } from 'naive-ui'
import Sidebar from '../components/sidebar/AppSidebar.vue'
import { useConfigStore } from '../store'

const config = useConfigStore()
const theme = computed(() => config.theme === 'dark' ? darkTheme : null)
</script>
