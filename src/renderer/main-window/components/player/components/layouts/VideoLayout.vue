<script setup>
import CaptionButton from '../buttons/CaptionButton.vue'
import FullscreenButton from '../buttons/FullscreenButton.vue'
import MuteButton from '../buttons/MuteButton.vue'
import PIPButton from '../buttons/PIPButton.vue'
import PlayButton from '../buttons/PlayButton.vue'
import Captions from '../Captions.vue'
import ChapterTitle from '../ChapterTitle.vue'
import Gestures from '../Gestures.vue'
import SettingsMenu from '../menus/SettingsMenu.vue'
import TimeSlider from '../sliders/TimeSlider.vue'
import VolumeSlider from '../sliders/VolumeSlider.vue'
import TimeGroup from '../TimeGroup.vue'
import PageButton from '../buttons/PageButton.vue'
import EpisodesButton from '../buttons/EpisodesButton.vue'
import ForwardButton from '../buttons/ForwardButton.vue'
import BackButton from '../buttons/BackButton.vue'
import { usePlayerStore } from '@/store'

const player = usePlayerStore()

const { thumbnails, poster } = defineProps({
  thumbnails: String,
  poster: {
    type: String,
    required: true
  },
  showTooltips: {
    type: [Boolean],
    default: undefined
  },
  headerText: {
    type: String,
    required: false,
    default: undefined
  },
  openPageIcon: {
    type: Object,
    required: false
  }
})

defineEmits(['openEpisodes', 'openPage', 'openBack', 'openForward'])
</script>

<template>
  <gestures />
  <captions />
  <media-controls
    class="media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity"
  >
    <div class="flex-1" />
    <media-controls-group class="px-4 pb-2">
      <div class="text-[20px]">
        {{ player.headerText }}
      </div>
      <div class="text-3xl font-bold">
        {{ player.activeVideoName }}
      </div>
    </media-controls-group>
    <media-controls-group class="flex items-center px-2 pb-3">
      <time-slider :thumbnails="thumbnails" />
    </media-controls-group>
    <media-controls-group class="-mt-0.5 flex items-center px-2 pb-6">
      <page-button
        :poster="poster"
        :icon="openPageIcon"
        tooltip-placement="top-start"
        @click="$emit('openPage')"
      />
      <episodes-button
        tooltip-placement="top-start"
        @click="player.showPlayListDrawer = true"
      />
      <time-group />
      <chapter-title />
      <back-button
        :disabled="player.backButtonDisabled"
        :footer-text="player.backVideoName"
        :show-tooltip="showTooltips"
        class="margin-right: 20px;"
        tooltip-placement="left"
        @open-back="$emit('openBack')"
      />
      <play-button
        :disabled="player.playButtonDisabled"
        tooltip-placement="top-start"
      />
      <forward-button
        :disabled="player.forwardButtonDisabled"
        :footer-text="player.forwardVideoName"
        :show-tooltip="showTooltips"
        class="margin-left: 20px;"
        tooltip-placement="right"
        @open-forward="$emit('openForward')"
      />
      <div class="flex-1" />
      <mute-button tooltip-placement="top" />
      <volume-slider />
      <caption-button tooltip-placement="top" />
      <settings-menu
        placement="top end"
        tooltip-placement="top"
      />
      <p-i-p-button tooltip-placement="top" />
      <fullscreen-button tooltip-placement="top-end" />
    </media-controls-group>
  </media-controls>
</template>

<style scoped>
media-controls {
  /* These CSS variables are supported out of the box to easily apply offsets to all tooltips/menus.  */
  --media-tooltip-y-offset: 30px;
  --media-menu-y-offset: 30px;
}

media-controls :deep(media-volume-slider) {
  --media-slider-preview-offset: 30px;
}
</style>
