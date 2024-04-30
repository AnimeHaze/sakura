<template>
  <div class="mt-2 mb-2">
    <span class="text-xl">Новости</span>
  </div>

  <swiper
    v-show="!loadingSwiper"
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :grab-cursor="true"
    @reach-end="news.load"
  >
    <swiper-slide
      v-for="slide of newsList"
      :id="slide.id"
      :key="slide.id"
    >
      <div
        @click="showPreview(slide.url, slide.name, slide.id)"
      >
        <n-image
          class="news-poster"
          round
          preview-disabled
          :width="300"
          :height="168"
          lazy
          object-fit="cover"
          :src="slide.preview"
          :alt="slide.name"
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

<!--  <n-modal-->
<!--    v-model:show="showModal"-->
<!--    preset="card"-->
<!--    :style="{ width: '800px' }"-->
<!--    :title="ytInfo.title"-->
<!--    :bordered="false"-->
<!--    size="medium"-->
<!--    :segmented="{-->
<!--      content: 'soft',-->
<!--      footer: 'soft'-->
<!--    }"-->
<!--  >-->
<!--    <YoutubeIframe-->
<!--      :video-id="ytInfo.id"-->
<!--      width="100%"-->
<!--      @ready="event => event.target.playVideo()"-->
<!--    />-->
<!--  </n-modal>-->
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useNewsStore } from '@/store'
import 'swiper/css'
import { router } from '@/router'

const news = useNewsStore()
const { loadingSwiper, newsList /*, ytInfo, showModal */ } = storeToRefs(news)

const breakpoints = {
  860: { slidesPerView: 2, spaceBetween: 50 },
  960: { slidesPerView: 3, spaceBetween: 220 },
  1130: { slidesPerView: 3, spaceBetween: 50 },
  1500: { slidesPerView: 4, spaceBetween: 30 },
  1750: { slidesPerView: 5, spaceBetween: 60 },
  2160: { slidesPerView: 6, spaceBetween: 60 }
}

function showPreview (url, title, id) {
  // ytInfo.value.id = url.split('/').pop().split('=').pop()
  // ytInfo.value.title = title
  // showModal.value = true
  router.push({
    name: 'Player',
    params: {
      id: 'youtube',
      video: id
    }
  })
}

onMounted(() => {
  if (!newsList.value.length) news.load()
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
