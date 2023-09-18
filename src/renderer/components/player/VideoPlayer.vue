<template>
  <media-player
    stream-type=""
    autoplay
    :title="title"
    :src="src"
    :poster="poster"
    :thumbnails="thumbnails"
    :aspect-ratio="aspectRatio"
    :crossorigin="crossOrigin"
  >
    <media-outlet>
      <media-poster
        :alt="posterAlt"
      />
      <track
        v-for="track in tracks"
        :key="track.label+track.kind+track.srcLang"
        :src="track.src"
        :label="track.label"
        :srclang="track.srcLang"
        :kind="track.kind"
        :default="track.default"
        :data-type="track.dataType"
      >
    </media-outlet>
    <media-community-skin />
  </media-player>
</template>

<script setup>
import { onMounted } from 'vue'
import { defineCustomElements } from 'vidstack/elements'

defineProps({
  autoplay: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: false,
    default: null
  },
  posterAlt: {
    type: String,
    required: false,
    default: null
  },
  thumbnails: {
    type: String,
    required: false,
    default: null
  },
  aspectRatio: {
    type: String,
    required: false,
    default: '16/9'
  },
  crossOrigin: {
    type: Boolean,
    required: false,
    default: false
  },
  tracks: {
    type: Array,
    default: () => []
  },
  streamType: {
    type: String,
    required: false
  }
})

onMounted(() => {
  defineCustomElements()
})
</script>

<style scoped>
@import "vidstack/styles/defaults.css";
@import "vidstack/styles/community-skin/video.css";
</style>
