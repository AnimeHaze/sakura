<template>
  <div>
    <h5 class="header-five">
      Последние релизы
    </h5>

    <swiper
      v-show="!loadingSwiper"
      :breakpoints="breakpoints"
      :pagination="{
        clickable: true,
      }"
      :grab-cursor="true"
      @reach-end="loading(loadMore)"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="slide in releasesList"
        :id="slide.id"
        :key="slide.id"
      >
        <release-slide
          :id="slide.id"
          :names="slide.names"
          :posters="slide.posters"
          @open-release="openRelease"
        />
      </swiper-slide>
    </swiper>

    <swiper
      :breakpoints="breakpoints"
      :pagination="{
        clickable: true,
      }"
      :grab-cursor="true"
      @swiper="onSwiper"
    >
      <swiper-slide
        v-for="(_, index) in new Array(releasesLimit)"
        v-show="loadingSwiper"
        :key="index"
      >
        <n-skeleton
          v-if="1"
          :height="180"
          :width="120"
          :sharp="false"
          size="medium"
        />
        <n-skeleton
          text
          :width="120"
          :sharp="false"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useConfigStore } from '../../store'
import ReleaseSlide from './ReleaseSlide.vue'

const router = useRouter()
const store = useConfigStore()

const loadingSwiper = ref(true)
const breakpoints = ref()
const releasesList = ref([])

const SidebarCollapsedBreakpoints = {
  860: { slidesPerView: 6, spaceBetween: 60 },
  1020: { slidesPerView: 7, spaceBetween: 20 },
  1280: { slidesPerView: 9, spaceBetween: 30 },
  1400: { slidesPerView: 10, spaceBetween: 40 },
  1600: { slidesPerView: 12, spaceBetween: 50 },
  1800: { slidesPerView: 13, spaceBetween: 50 },
  2160: { slidesPerView: 16, spaceBetween: 60 }
}
const SidebarExpandedBreakpoints = {
  860: { slidesPerView: 5, spaceBetween: 70 },
  1020: { slidesPerView: 6, spaceBetween: 40 },
  1280: { slidesPerView: 8, spaceBetween: 60 },
  1400: { slidesPerView: 9, spaceBetween: 70 },
  1600: { slidesPerView: 11, spaceBetween: 80 },
  1800: { slidesPerView: 12, spaceBetween: 90 },
  2160: { slidesPerView: 15, spaceBetween: 100 }
}

async function loading (callback) {
  loadingSwiper.value = true
  const result = await callback()
  loadingSwiper.value = false
  return result
}

onBeforeMount(() => {
  breakpoints.value = store.sidebarCollapsed ? SidebarCollapsedBreakpoints : SidebarExpandedBreakpoints
})

onMounted(function () {
  loading(() => getLastReleases(releasesLimit))
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

const releasesLimit = 20
let releasesOffset = releasesLimit

async function loadMore () {
  const { result } = await window.api.getLastReleases({ limit: releasesLimit, offset: releasesOffset })
  releasesList.value.push(...result)
  releasesOffset += releasesLimit
}

async function getLastReleases (limit) {
  const { result } = await window.api.getLastReleases({ limit })
  releasesList.value = result
}
</script>
