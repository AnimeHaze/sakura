<template>
  <div class="absolute">
    <img
      alt="Poster"
      class="anime-poster"
      src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/11757-TlEEV9weG4Ag.jpg"
    >
    <div
      class="anime-poster-overlay"
      :class="PosterOverlayClass"
    />
  </div>
</template>

<script setup>
import { useConfigStore } from '../../store'
import { onBeforeMount, ref } from 'vue'
const store = useConfigStore()
const PosterOverlayClass = ref({ 'anime-poster-overlay-dark': false, 'anime-poster-overlay-light': false })
onBeforeMount(function () {
  CheckTheme(store)
})
store.$subscribe((mutation, state) => {
  CheckTheme(state)
})
function CheckTheme (state) {
  if (state.theme === 'dark') {
    PosterOverlayClass.value['anime-poster-overlay-light'] = false
    PosterOverlayClass.value['anime-poster-overlay-dark'] = true
  } else {
    PosterOverlayClass.value['anime-poster-overlay-dark'] = false
    PosterOverlayClass.value['anime-poster-overlay-light'] = true
  }
}
</script>

<style scoped>

</style>
