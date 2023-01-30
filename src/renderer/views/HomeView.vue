<template>
  <swiper
    :slides-per-view="1"
    :modules="[Lazy]"
    :lazy="true"
  >
    <swiper-slide
      v-for="a in 3"
      :key="a"
    >
      <AnimePreview />
    </swiper-slide>
    ...
  </swiper>
  <div class="p-4">
    <last-releases />
    <news />
  </div>
</template>

<script setup>
import 'swiper/css/lazy'
import LastReleases from '../components/home/LastReleases.vue'
import News from '../components/home/HomeNews.vue'
import AnimePreview from '../components/home/AnimePreview.vue'
import { Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
</script>
