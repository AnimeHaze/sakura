<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <transition>
        <component :is="Component" />
      </transition>
    </transition>
  </router-view>
</template>

<script setup>

</script>

<style scoped>
body {
  background: #000;
}
</style>
