<template>
  <div>
    <div class="mb-3">
      <strong class="text-xl">Связанное</strong>
    </div>

    <swiper
      :breakpoints="breakpoints"
      :pagination="{
        clickable: true
      }"
      :grab-cursor="true"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="slide in franchises"
        :id="slide.id"
        :key="slide.id"
      >
        <franchise-slide
          :id="slide.id"
          :names="slide.names"
          :posters="slide.posters"
          @open-release="openRelease"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useConfigStore } from '../../store'
import FranchiseSlide from './FranchiseSlide.vue'

const router = useRouter()
const store = useConfigStore()

defineProps({
  franchises: {
    type: Object,
    default: () => []
  }
})

const breakpoints = ref()

const SidebarCollapsedBreakpoints = {
  860: { slidesPerView: 3 },
  1020: { slidesPerView: 5 },
  1160: { slidesPerView: 6 },
  1400: { slidesPerView: 8 },
  1640: { slidesPerView: 10 },
  1940: { slidesPerView: 13 },
  2160: { slidesPerView: 14 },
  2560: { slidesPerView: 16 },
  3160: { slidesPerView: 18 },
  3560: { slidesPerView: 20 }
}
const SidebarExpandedBreakpoints = {
  860: { slidesPerView: 2 },
  1020: { slidesPerView: 3 },
  1160: { slidesPerView: 4 },
  1400: { slidesPerView: 6 },
  1640: { slidesPerView: 8 },
  1940: { slidesPerView: 10 },
  2160: { slidesPerView: 13 },
  2560: { slidesPerView: 16 },
  3160: { slidesPerView: 18 },
  3560: { slidesPerView: 20 }
}

onBeforeMount(() => {
  breakpoints.value = store.sidebarCollapsed ? SidebarCollapsedBreakpoints : SidebarExpandedBreakpoints
})

function onSwiper (swiper) {
  store.$subscribe((mutation, state) => {
    swiper.params.breakpoints = state.sidebarCollapsed ? SidebarCollapsedBreakpoints : SidebarExpandedBreakpoints
    // TODO: Maybe we should find more the best way in future to make swiper breakpoints recalculate when app sidebar open / close
    // currentBreakpoint - internal swiper private API, see https://github.com/nolimits4web/swiper/issues/3539
    swiper.currentBreakpoint = false
    swiper.update()
  })
}

function openRelease (id) {
  router.push({ name: 'Release', params: { id } })
}
</script>
