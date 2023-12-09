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
import ReleaseButton from '../buttons/ReleaseButton.vue'
import EpisodesButton from '../buttons/EpisodesButton.vue'
import ForwardButton from '../buttons/ForwardButton.vue'
import BackButton from '../buttons/BackButton.vue'

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
  backEpisodeText: {
    type: String,
    required: true
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

defineEmits(['openEpisodes', 'openRelease', 'openBack', 'openForward'])
</script>

<template>
  <Gestures />
  <Captions />
  <media-controls
    class="media-controls:opacity-100 absolute inset-0 z-10 flex h-full w-full flex-col bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity"
  >
    <div class="flex-1" />
    <media-controls-group class="px-4 pb-2">
      <div class="text-[20px]">{{ releaseName }}</div>
      <div class="text-3xl font-bold">{{ episodeName }}</div>
    </media-controls-group>
    <media-controls-group class="flex items-center px-2 pb-3">
      <TimeSlider :thumbnails="thumbnails" />
    </media-controls-group>
    <media-controls-group class="-mt-0.5 flex items-center px-2 pb-6">
      <ReleaseButton
        :poster="poster"
        tooltip-placement="top-start"
        @click="$emit('openRelease')"
      />
      <EpisodesButton
        tooltip-placement="top-start"
        @click="$emit('openEpisodes')"
      />
      <TimeGroup />
      <ChapterTitle />
      <BackButton
        :disabled="backDisabled"
        :footer-text="backEpisodeText"
        :show-tooltip="showTooltips"
        class="margin-right: 20px;"
        tooltip-placement="left"
        @open-back="$emit('openBack')"
      />
      <PlayButton tooltip-placement="top-start" />
      <ForwardButton
        :disabled="forwardDisabled"
        :footer-text="forwardEpisodeText"
        :show-tooltip="showTooltips"
        class="margin-left: 20px;"
        tooltip-placement="right"
        @open-forward="$emit('openForward')"
      />
      <div class="flex-1" />
      <MuteButton tooltip-placement="top" />
      <VolumeSlider />
      <CaptionButton tooltip-placement="top" />
      <SettingsMenu
        placement="top end"
        tooltip-placement="top"
      />
      <PIPButton tooltip-placement="top" />
      <FullscreenButton tooltip-placement="top-end" />
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
