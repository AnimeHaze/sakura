<template>
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
</template>

<script setup>
import Sidebar from '../components/sidebar/AppSidebar.vue'
</script>
