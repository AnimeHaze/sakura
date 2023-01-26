<template>
  <div class="p-4">
    <last-releases
      v-show="siderbanhiden"
      :breakpoints="menuhidenbreakpoints"
    />
    <last-releases
      v-show="!siderbanhiden"
      :breakpoints="menuopenbreakpoints"
    />
    <news />
  </div>
</template>

<script setup>
import LastReleases from '../components/home/LastReleases.vue'
import News from '../components/home/HomeNews.vue'
import { useConfigStore } from '../store'
import { ref } from 'vue'
const store = useConfigStore()
const menuhidenbreakpoints = {
  860: { slidesPerView: 6, spaceBetween: 60 },
  1020: { slidesPerView: 7, spaceBetween: 20 },
  1280: { slidesPerView: 9, spaceBetween: 30 },
  1400: { slidesPerView: 10, spaceBetween: 40 },
  1600: { slidesPerView: 12, spaceBetween: 50 },
  1800: { slidesPerView: 13, spaceBetween: 50 },
  2160: { slidesPerView: 16, spaceBetween: 60 }
}
const menuopenbreakpoints = {
  860: { slidesPerView: 5, spaceBetween: 70 },
  1020: { slidesPerView: 6, spaceBetween: 40 },
  1280: { slidesPerView: 8, spaceBetween: 60 },
  1400: { slidesPerView: 9, spaceBetween: 70 },
  1600: { slidesPerView: 11, spaceBetween: 80 },
  1800: { slidesPerView: 12, spaceBetween: 90 },
  2160: { slidesPerView: 15, spaceBetween: 100 }
}
const siderbanhiden = ref({})
store.$subscribe((mutation, state) => {
  siderbanhiden.value = state.sidebarCollapsed
})

</script>
