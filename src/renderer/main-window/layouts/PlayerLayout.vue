<template>
  <div class="relative full-page-height bg-black">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <transition>
          <component :is="Component" />
        </transition>
      </transition>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
</style>
