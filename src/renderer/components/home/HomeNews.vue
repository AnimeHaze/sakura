<template>
  <h5
    class="header-five mt-2"
  >
    Новости
  </h5>

  <swiper
    v-show="!loadingSwiper"
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :grab-cursor="true"
    @reach-end="loading(load)"
  >
    <swiper-slide
      v-for="slide of news"
      :id="slide.id"
      :key="slide.id"
    >
      <div
        @click="showPreview(slide.url, slide.title)"
      >
        <n-image
          class="news-poster"
          round
          preview-disabled
          lazy
          :src="slide.preview"
          :alt="slide.title"
        >
          <template #placeholder>
            <n-skeleton
              :height="170"
              :width="300"
              :sharp="false"
              size="medium"
            />
          </template>
        </n-image>
      </div>
    </swiper-slide>
  </swiper>

  <swiper
    v-show="loadingSwiper"
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :grab-cursor="true"
  >
    <swiper-slide
      v-for="(_, index) in new Array(20)"
      :key="index"
    >
      <n-skeleton
        :height="170"
        :width="300"
        :sharp="false"
        size="medium"
      />
    </swiper-slide>
  </swiper>

  <n-modal
    v-model:show="showModal"
    preset="card"
    :style="{ width: '800px' }"
    :title="ytInfo.title"
    :bordered="false"
    size="medium"
    :segmented="{
      content: 'soft',
      footer: 'soft'
    }"
  >
    <YoutubeIframe
      :video-id="ytInfo.id"
      width="100%"
      @ready="event => event.target.playVideo()"
    />
  </n-modal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { YoutubeIframe } from '@vue-youtube/component'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const showModal = ref(false)
const ytInfo = ref({})

const loadingSwiper = ref(true)
const page = ref(1)
const news = ref([])

const breakpoints = {
  860: { slidesPerView: 2, spaceBetween: 50 },
  960: { slidesPerView: 3, spaceBetween: 220 },
  1130: { slidesPerView: 3, spaceBetween: 50 },
  1500: { slidesPerView: 4, spaceBetween: 30 },
  1750: { slidesPerView: 5, spaceBetween: 60 },
  2160: { slidesPerView: 6, spaceBetween: 60 }
}

function showPreview (url, title) {
  ytInfo.value.id = url.split('/').pop().split('=').pop()
  ytInfo.value.title = title
  showModal.value = true
}

async function loading (callback) {
  loadingSwiper.value = true
  const result = await callback()
  loadingSwiper.value = false
  return result
}

async function load () {
  const { result } = await window.api.getNews({ page: page.value, limit: 20 })
  news.value.push(...result)
  page.value++
}

onMounted(() => {
  return loading(load)
})
</script>

<style scoped>
.news-poster {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
  border-radius: 4px;
  width: 300px;
  max-width: 300px;
  transition: opacity 125ms ease-in-out;
}

.news-poster:hover {
  opacity: 1;
}
</style>
