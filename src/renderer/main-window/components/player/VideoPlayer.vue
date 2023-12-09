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

const emit = defineEmits(['openEpisodes', 'openRelease', 'openBack', 'openForward', 'canPlay', 'waiting', 'pause', 'play'])
const canPlayRef = ref(false)
const waitingRef = ref(false)
const pausedRef = ref(false)

/** @type {Ref<MediaPlayerElement>} */
const $player = ref()
const showTooltips = ref(undefined)

onMounted(() => {
  for (const track of textTracks) $player.value.textTracks.add(track)

  return $player.value.subscribe((data) => {
    console.log(data)
    const { paused, viewType, controlsVisible, canPlay, waiting } = data

    if (pausedRef.value !== paused) {
      pausedRef.value = paused

      if (paused) {
        emit('pause', paused)
      } else emit('play', paused)
    }

    if (canPlayRef.value !== canPlay) {
      canPlayRef.value = canPlay
      emit('canPlay', canPlay)
    }

    if (waitingRef.value !== waiting) {
      waitingRef.value = waiting
      emit('waiting', waiting)
    }

    showTooltips.value = controlsVisible ? true : undefined

    console.log('is waiting?', '->', waiting)
    console.log('is canPlay?', '->', canPlay)
    console.log('is paused?', '->', paused)
    console.log('is controlsVisible?', '->', controlsVisible)
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
  },
  source: {
    required: true,
    type: String
  },
  backEpisodeText: {
    type: String,
    required: false,
    default: undefined
  },
  forwardEpisodeText: {
    type: String,
    required: false,
    default: undefined
  },
  backDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  forwardDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  episodeName: {
    type: String,
    required: false,
    default: undefined
  },
  releaseName: {
    type: String,
    required: false,
    default: undefined
  }
})
</script>

<template>
  <div>
    <media-player
      ref="$player"
      class="h-full m-0 top-1/2 -translate-y-1/2 w-full aspect-video text-white font-sans overflow-hidden ring-media-focus data-[focus]:ring-4"
      title="Sprite Fight"
      :src="source"
      crossorigin
      @provider-change="onProviderChange"
      @can-play="onCanPlay"
    >
      <slot name="loader"></slot>
      <!-- h-full fixes "cropped poster line" when video not loaded https://i.imgur.com/2EscXVK.png -->
      <media-provider class="h-full">
        <media-poster
          class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          src="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=1200"
          alt="Girl walks into campfire with gnomes surrounding her friend ready for their next meal!"
        />
      </media-provider>
      <VideoLayout
        :release-name="releaseName"
        :episode-name="episodeName"
        :back-disabled="backDisabled"
        :forward-disabled="forwardDisabled"
        :back-episode-text="backEpisodeText"
        :forward-episode-text="forwardEpisodeText"
        :show-tooltips="showTooltips"
        :poster="poster"
        thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
        @open-back="$emit('openBack')"
        @open-forward="$emit('openForward')"
        @open-release="$emit('openRelease')"
        @open-episodes="$emit('openEpisodes')"
      />
    </media-player>
  </div>
</template>

<style scoped>
</style>
