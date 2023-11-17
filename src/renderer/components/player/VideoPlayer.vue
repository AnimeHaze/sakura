<script setup>
import './assets/base.css'
import 'vidstack/player/styles/base.css'

import 'vidstack/player'
import 'vidstack/player/ui'
import 'vidstack/icons'

import { isHLSProvider } from 'vidstack'
import { onMounted, ref } from 'vue'

import VideoLayout from './components/layouts/VideoLayout.vue'
import { textTracks } from './track'

/** @type {Ref<MediaPlayerElement>} */
const $player = ref()

onMounted(() => {
  for (const track of textTracks) $player.value.textTracks.add(track)

  return $player.value.subscribe(({ paused, viewType }) => {
    console.log('is paused?', '->', paused)
    console.log('is audio view?', '->', viewType === 'audio')
  })
})

/**
 * @param {MediaProviderChangeEvent} event
 */
function onProviderChange (event) {
  const provider = event.detail
  if (isHLSProvider(provider)) {
    provider.config = {}
  }
}

/**
 * @param {MediaCanPlayEvent} event
 */
function onCanPlay (event) {
  event.target.play()
}

const { poster } = defineProps({
  poster: {
    required: true,
    type: String
  }
})

defineEmits(['openEpisodes', 'openRelease'])
</script>

<template>
  <div>
    <media-player
      ref="$player"
      class="w-full aspect-video text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4"
      title="Sprite Fight"
      src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/high.mp4"
      crossorigin
      @provider-change="onProviderChange"
      @can-play="onCanPlay"
    >
      <!-- h-full fixes "cropped poster line" when video not loaded https://i.imgur.com/2EscXVK.png -->
      <media-provider class="h-full">
        <media-poster
          class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
      </media-provider>

      <VideoLayout
        :poster="poster"
        thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
        @open-release="$emit('openRelease')"
        @open-episodes="$emit('openEpisodes')"
      />
    </media-player>
  </div>
</template>
