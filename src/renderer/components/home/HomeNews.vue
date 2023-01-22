<template>
  <h5
    class="header-five mt-2"
  >
    Новости
  </h5>
  <swiper
    :breakpoints="breakpoints"
    :pagination="{
      clickable: true,
    }"
    :grab-cursor="true"
  >
    <swiper-slide
      v-for="slide in (loadingSwiper ? Array.from(Array(20).keys()) : Array.from(Array(news.length).keys()))"
      :key="slide"
    >
      <div v-if="loadingSwiper">
        <n-skeleton
          v-if="1"
          :height="180"
          :width="300"
          :sharp="false"
          size="medium"
        />
      </div>

      <div v-if="!loadingSwiper">
        <img
          class="news-poster"
          :src="news[slide]"
          alt=""
        >
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
const loadingSwiper = ref(true)

const breakpoints = {
  860: { slidesPerView: 2, spaceBetween: 50 },
  960: { slidesPerView: 3, spaceBetween: 220 },
  1130: { slidesPerView: 3, spaceBetween: 50 },
  1500: { slidesPerView: 4, spaceBetween: 30 },
  1750: { slidesPerView: 5, spaceBetween: 60 },
  2160: { slidesPerView: 6, spaceBetween: 60 }
}

const news = [
  'https://top.anilibria.cf/storage/media/videos/previews/502/b9RO7UiMtHMKaRpE__361fb1a0ea18c8855ed9081411da0e9d.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/529/EkyFeY8bWyn7Ua4p__964da049dab94a4e1a5b10b2a8322ceb.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/476/50VKeX3Lbk8OInVm__d311fbb6a9df7201ecbf9abc9f06a86c.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/527/KEnw2V8oL21hUoOw__4d10cf311d78591be8040d057b7fc488.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/436/dTa8hcfKkjH32fQC__cde385f61288910c4efb892ec8db4780.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/528/OplgIzu955bUZxyw__3530664dbbe629fa41f7791c9fa23978.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/400/FIaYWCYOx9NGLOOR__f10306ed7d404e7e40ef9d595d1288fc.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/526/7Sm17ZuzMrhmr16E__2b2729787c202566bd888cc1895ff492.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/525/Jje8XoIFerhG78N4__3fcc93cd365a86b027f995ba19d79934.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/335/ys9dzX3CPZ0BnabD__0da1c26622e6f7fda2e5b437082a318d.jpg',
  'https://top.anilibria.cf/storage/media/videos/previews/524/lNuP85eCehXGtWgb__0161889acd57fc2d9ecb392570cdeabf.jpg'
]

setTimeout(() => (loadingSwiper.value = false), Math.floor(Math.random() * (2000 - 500) + 500))
</script>

<style scoped>
.news-poster {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  object-fit: cover;
  border-radius: 4px;
  max-width: 300px;
  transition: opacity 125ms ease-in-out;
}

.news-poster:hover {
  opacity: 1;
}
</style>
