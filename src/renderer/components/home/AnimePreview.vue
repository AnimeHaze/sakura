<template>
  <div
    class="mb-4 relative video-container"
  >
    <iframe
      width="100%"
      src="https://www.youtube.com/embed/Sk39zsayK_0?mute=1&controls=0&autoplay=1&loop=1&rel=0&playlist=Sk39zsayK_0"
      title="「四月は君の嘘」第一弾PV"
      allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
    <div
      class="anime-video-overlay"
      :class="VideoOverlayClass"
    />
    <div class="anime-video-info ml-4 mb-16">
      <n-tag
        :bordered="false"
        type="success"
        class="mr-2 rounded"
        :color="{color: 'rgba(99, 226, 183, 0.7)', textColor: '#ffffff'}"
      >
        Сериал
      </n-tag>
      <n-tag
        :bordered="false"
        type="success"
        class="mr-2 rounded"
        :color="{color: 'rgba(16,16,20,255)', textColor: '#ffffff'}"
      >
        2023г.
      </n-tag>
      <div class="font-500 text-3xl anime-clickable-text">
        Твоя апрельская ложь
      </div>
      <div class="text-gray-500 text-base">
        Косэй Арима - виртуозный пианист, как говорили его наставники. С малого возраста он играл сложнейшие композиции благодаря своему чутью, он делал все точно, как прописано в нотах, даже механически. Выиграв немало конкурсов, знатоки все еще говорили, что это не талант, а дисциплина и упорство, а мальчик просто быстро справился с нагрузками. Как бы то ни было, он признавался одним из лучших пианистов в своей категории.
      </div>
    </div>
  </div>
</template>

<script setup>
import { useConfigStore } from '../../store'
import { onBeforeMount, ref } from 'vue'
const store = useConfigStore()
const VideoOverlayClass = ref({ 'anime-video-overlay-dark': false, 'anime-video-overlay-light': false })
onBeforeMount(function () {
  CheckTheme(store)
})
store.$subscribe((mutation, state) => {
  CheckTheme(state)
})
function CheckTheme (state) {
  if (state.theme === 'dark') {
    VideoOverlayClass.value['anime-video-overlay-light'] = false
    VideoOverlayClass.value['anime-video-overlay-dark'] = true
  } else {
    VideoOverlayClass.value['anime-video-overlay-dark'] = false
    VideoOverlayClass.value['anime-video-overlay-light'] = true
  }
}

</script>

<style scoped>

</style>
