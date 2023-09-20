<script setup>
import VideoPlayer from '../components/player/VideoPlayer.vue'
</script>

<template>
  <video-player
    title="123"
    aspect-ratio="16/9"
    :cross-origin="true"
    poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
    poster-alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
    src="https://cache.libria.fun/videos/media/ts/9477/1/1080/cb7a6abb65ddc10387257652454c65d2.m3u8"
    :tracks="[
      { src: 'https://media-files.vidstack.io/sprite-fight/subs/english.vtt', label: 'English', srcLang: 'en-US', kind: 'subtitles', default: true },
      { src: 'http://127.0.0.1:8000/chapters', dataType: 'json', kind: 'chapters', default: true }
    ]"
  />
</template>

<style scoped>

</style>
