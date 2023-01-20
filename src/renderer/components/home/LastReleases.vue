<template>
  <div>
    <h5 class="header-five">
      Последние релизы
    </h5>
    <swiper
      :breakpoints="{
        860: { slidesPerView: 5, spaceBetween: 60 },
        1020: { slidesPerView: 6, spaceBetween: 20 },
        1280: { slidesPerView: 7, spaceBetween: 30 },
        1400: { slidesPerView: 9, spaceBetween: 40 },
        1800: { slidesPerView: 11, spaceBetween: 50 },
        2160: { slidesPerView: 14, spaceBetween: 60 },
      }"
      :pagination="{
        clickable: true,
      }"
      :grab-cursor="true"
    >
      <swiper-slide
        v-for="slide in (loadingSwiper ? Array.from(Array(20).keys()) : Array.from(Array(images.length).keys()))"
        :key="slide"
      >
        <n-tooltip
          :delay="1200"
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <div>
              <div v-if="loadingSwiper">
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
              </div>

              <div
                v-if="!loadingSwiper"
                class="poster"
              >
                <img
                  :alt="titles[slide]"
                  :src="images[slide]"
                >
                <div
                  class="poster-title"
                  style="color: #666666"
                >
                  {{ titles[slide] }}
                </div>
              </div>
            </div>
          </template>
          <span>{{ titles[slide] }}</span>
        </n-tooltip>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const loadingSwiper = ref(true)

const titles = [
  'Невероятные приключения ДжоДжо: каменный океан',
  'Явись Ирума 3',
  'Сага о винланде 2',
  'Может, я встречу тебя в подземелье? IV. Часть 2',
  'Непризнанный школой владыка демонов 2!',
  'Боруто: Новое поколение Наруто',
  'Токийские мстители: Рождественская битва',
  'Токийские мстители: Рождественская битва',
  'Моя геройская академия 6'
]

const images = [
  'https://www.anilibria.tv/storage/releases/posters/9097/PEFjpxCXaLMFATFJ__e2dec6218fdd4fb51d6b981611a98ee8.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9266/edk2kCItHOx6fUNu__01efc0a63761fddf43db766f5b1522d9.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9327/MmsRDWtqNaf4O865__4fc73dcc5520b79569232a4f0e7d4b8c.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9333/vR71EBPQHC4iG2B9__53c7ccdf7f04fefcf7e25080c0270a04.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9325/REom0UxgVviCWHW7__77b5e99dbfbfa58ac8185728c956a1bf.jpg',
  'https://www.anilibria.tv/storage/releases/posters/3996/EYY4BbyYQ8AfZKIj__6467adcb67dc2e5f7078c7f645ccb9e5.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9331/gTIANFa3uqdhk1yE__b6009168990d1c7ac1880f7eae0f073c.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9337/2YhbpJ4vV6PRijFO__15feab82deffdbdf2abcc3bf0dccf27d.jpg',
  'https://www.anilibria.tv/storage/releases/posters/9260/7iezY4NrImAx6eWb__da55cdb7655d58464fe7c08bd70d6812.jpg'
]

setTimeout(() => (loadingSwiper.value = false), Math.floor(Math.random() * (2000 - 500) + 500))
</script>

<style scoped>
.poster {
  text-align: center;
  width: 120px;
}

.poster > img {
  border: 1px solid rgb(108 108 108 / 36%);
  pointer-events: auto;
  object-fit: cover;
  border-radius: 6px;
  width: 120px;
  height: 180px;
  opacity: 0.7;
  transition: opacity 125ms ease-in-out;
}

.poster > img:hover {
  opacity: 1;
}

.poster-title {
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.7);
  align-self: center;
  max-width: 120px;
}
</style>
