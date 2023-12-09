<template>
  <n-layout
    class="h-screen select-none"
    has-sider
  >
    <Sidebar />
    <n-layout :native-scrollbar="false">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <transition>
            <component :is="Component" />
          </transition>
        </transition>
      </router-view>
    </n-layout>
  </n-layout>
</template>

<script setup>
import Sidebar from '@/components/sidebar/AppSidebar.vue'
</script>
