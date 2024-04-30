<script setup>
import './assets/base.css'
import 'vidstack/player/styles/base.css'

import 'vidstack/player'
import 'vidstack/player/ui'
import 'vidstack/icons'

import { isHLSProvider, isYouTubeProvider, TextTrack } from 'vidstack'
import { nextTick, onMounted, ref, watch } from 'vue'

import VideoLayout from './components/layouts/VideoLayout.vue'
import { textTracks } from './track'
import { usePlayerStore } from '@/store'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['openPage', 'openBack', 'openForward', 'pause', 'play'])
const pausedRef = ref(false)

/** @type {Ref<MediaPlayerElement>} */
const $player = ref()
const showTooltips = ref(undefined)
const player = usePlayerStore()
const { canPlay: canPlayRef, waiting: waitingRef, poster } = storeToRefs(player)

onMounted(() => {
  const track = new TextTrack({
    src: 'https://reference.opengram.dev/Trigun.rus.srt',
    kind: 'subtitles',
    label: 'Russian',
    language: 'ru-RU',
    type: 'srt',
    default: true
  })


  $player.value.textTracks.add(track)
  // for (const track of textTracks) $player.value.textTracks.add(track)ca

  $player.value.subscribe(({ volume, muted, canPlay }) => {
    if (!canPlay) return
    player.volume = volume
    player.muted = muted
  })

  return $player.value.subscribe((data) => {
    const { paused, viewType, controlsVisible, canPlay, waiting } = data

    if (pausedRef.value !== paused) {
      pausedRef.value = paused

      if (paused) {
        emit('pause', paused)
      } else emit('play', paused)
    }

    if (canPlayRef.value !== canPlay) {
      canPlayRef.value = canPlay
    }

    if (waitingRef.value !== waiting) {
      waitingRef.value = waiting
    }

    showTooltips.value = controlsVisible ? true : undefined

    // console.table(data)

    // console.log('is waiting?', '->', waiting)
    // console.log('is canPlay?', '->', canPlay)
    // console.log('is paused?', '->', paused)
    // console.log('is controlsVisible?', '->', controlsVisible)
    // console.log('is audio view?', '->', viewType === 'audio')
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

  if (isYouTubeProvider(provider)) {
    provider.cookies = false

    /*
      TODO: OMFG! I monkey patched this shit to add rel=0 param that disables youtube "see more"
    */
    const buildParams = provider._buildParams
    provider._buildParams = function () {
      const result = buildParams.apply(provider, arguments)
      result.rel = 0
      return result
    }
  }
}

/**
 * @param {MediaCanPlayEvent} event
 */
function onCanPlay (event) {
  $player.value.volume = player.volume
  $player.value.muted = player.muted
  /// $player.value.currentTime = 0
  // event.target.play()
}

const props = defineProps({
  source: {
    required: true,
    type: [Object, String]
  },
  openPageIcon: {
    type: Object,
    required: false
  }
})
</script>

<template>
  <div>
    <media-player
      ref="$player"
      stream-type="on-demand"
      autoplay
      class="h-full m-0 top-1/2 -translate-y-1/2 w-full aspect-video text-white font-sans overflow-hidden ring-media-focus data-[focus]:ring-4"
      title="Sprite Fight"
      :src="source"
      crossorigin
      @provider-change="onProviderChange"
      @can-play="onCanPlay"
    >
      <slot name="loader" />
      <!-- h-full fixes "cropped poster line" when video not loaded https://i.imgur.com/2EscXVK.png -->
      <media-provider class="h-full">
        <img
          style="filter: blur(100px);"
          class="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          :src="poster"
          alt="Poster"
        >
      </media-provider>

      <video-layout
        :show-tooltips="showTooltips"
        :poster="poster"
        :open-page-icon="openPageIcon"
        thumbnails="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/storyboard.vtt"
        @open-back="$emit('openBack')"
        @open-forward="$emit('openForward')"
        @open-page="$emit('openPage')"
      />
    </media-player>
  </div>
</template>

<style>
</style>
