<script setup>
import VideoPlayer from '../components/player/VideoPlayer.vue'
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ReleaseEpisodes from '@/components/release/ReleaseEpisodes.vue'
import { Animations } from '@assets/animations'
import { getRandomIntInclusive } from '../../utils'

const showEpisodesDrawer = ref(false)
const release = ref(null)
const router = useRouter()
const route = useRoute()
const backEpisode = ref({})
const forwardEpisode = ref(null)
const activeEpisode = ref(null)
const loading = ref(true)
const canPlay = ref(false)
const waiting = ref(false)

const poster = computed(() => release.value?.posters?.medium || release.value?.posters?.original)

function computeEpisodes () {
  const { episodes } = release.value

  const activeEpisodeIndex = episodes.findIndex(x => route.params.episode === x.id)
  activeEpisode.value = episodes[activeEpisodeIndex]

  backEpisode.value = episodes[activeEpisodeIndex - 1] || null
  forwardEpisode.value = episodes[activeEpisodeIndex + 1] || null
}

watch(() => route.params.id, async (value) => {
  loading.value = true
  const { result } = await window.api.getRelease({ id: value })
  release.value = result
  computeEpisodes()
  loading.value = false
}, { immediate: true })

watch(() => route.params.episode, () => {
  if (release.value) computeEpisodes()
})

const backEpisodeName = computed(() => {
  if (backEpisode.value === null) return
  const { name, number } = backEpisode.value
  let episodeName = `Эпизод ${number}`
  if (name) episodeName += ` (${name})`
  return episodeName
})

const forwardEpisodeName = computed(() => {
  if (forwardEpisode.value === null) return
  const { name, number } = forwardEpisode.value
  let episodeName = `Эпизод ${number}`
  if (name) episodeName += ` (${name})`
  return episodeName
})

const activeEpisodeName = computed(() => {
  const { name, number } = activeEpisode.value
  let episodeName = `Эпизод ${number}`
  if (name) episodeName += ` (${name})`
  return episodeName
})

const playerReady = computed(() => canPlay.value && !loading.value && !waiting.value)
</script>

<template>
  <div>
    <div>
      <n-drawer
        v-model:show="showEpisodesDrawer"
        to="media-player"
        class="select-none"
        resizable
        default-width="400"
        :min-width="300"
        :max-width="700"
        placement="left"
        :z-index="2147483647"
      >
        <n-drawer-content
          :native-scrollbar="false"
          :closable="true"
          body-content-style="padding: 0px"
          title="Эпизоды"
        >
          <div class="p-4">
            <release-episodes
              :active-episode="activeEpisode"
              :episodes="release.episodes"
            />
          </div>
        </n-drawer-content>
      </n-drawer>
      <div v-if="activeEpisode">
        <video-player
          :back-episode-text="backEpisodeName"
          :back-disabled="!backEpisode"
          :forward-disabled="!forwardEpisode"
          :forward-episode-text="forwardEpisodeName"
          :poster="poster"
          :source="activeEpisode.video?.[0]?.source"
          :forward-episode="forwardEpisode"
          :episode-name="activeEpisodeName"
          :release-name="release.names.ru"
          @waiting="waiting = $event"
          @can-play="canPlay = $event"
          @open-forward="$router.push({ name: 'Player', params: { episode: forwardEpisode.id } })"
          @open-back="$router.push({ name: 'Player', params: { episode: backEpisode.id } })"
          @open-episodes="showEpisodesDrawer = true"
          @open-release="router.push({ name: 'Release', params: { id: route.params.id } })"
        />
      </div>
    </div>

    <div
      v-show="!playerReady"
      class="select-none absolute text-center transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
    >
      <img
        class="w-80"
        :src="Animations[getRandomIntInclusive(0, Animations.length - 1)]"
        alt="Loading..."
      >
    </div>
  </div>
</template>

<style scoped>
.episodes-button {
  z-index: 1;
  padding: 6px;
  height: 36px;
  width: 36px;
  left: 10px;
  top: 10px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
