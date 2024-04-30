<script setup>
import VideoPlayer from '@/components/player/VideoPlayer.vue'
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import PlayList from '@/components/playlist/PlayList.vue'
import { Animations } from '@assets/animations'
import { getRandomIntInclusive } from '../../../utils'
import { AppsOutline, PauseSharp, PlaySharp } from '@vicons/ionicons5'
import { useNewsStore, usePlayerStore } from '@/store'
import { storeToRefs } from 'pinia'
import { sortType } from '@enums/index'

const router = useRouter()
const route = useRoute()
const player = usePlayerStore()
const news = useNewsStore()
const { headerText, isYoutube, isPlay, showPlayListDrawer, activeVideo, backVideo, forwardVideo, loading, playerReady, showLoadMoreButton } = storeToRefs(player)
const release = ref({})

watch(() => route.params.id, async (value) => {
  isYoutube.value = value === 'youtube'
  showLoadMoreButton.value = isYoutube && true

  if (isYoutube.value) {
    player.computeMenuPlayListInfo(news.newsList, route.params.video)
  } else {
    loading.value = true
    const { result } = await window.api.getRelease({ id: value })
    release.value = result
    headerText.value = release.value.names?.ru
    player.poster = release.value?.posters?.medium || release.value?.posters?.original
    player.computeMenuPlayListInfo(release.value.episodes, route.params.video)
  }

  loading.value = false
}, { immediate: true })

watch(() => route.params.video, () => {
  if (isYoutube.value) {
    player.computeMenuPlayListInfo(news.newsList, route.params.video)
  } else player.computeMenuPlayListInfo(release.value.episodes, route.params.video)
})

const animatedPausePlay = ref(true)

let playPauseTimeout = null

function animatePausePlay (play) {
  isPlay.value = play
  if (!playPauseTimeout) {
    animatedPausePlay.value = true
    playPauseTimeout = setTimeout(() => {
      animatedPausePlay.value = false
      playPauseTimeout = null
    }, 500)
  }
}

async function openForward () {
  if (isYoutube && !forwardVideo.value) {
    await loadMore()
    player.computeMenuPlayListInfo(news.newsList, route.params.video)
  }

  if (forwardVideo.value) {
    await router.push({
      name: 'Player',
      params: { video: forwardVideo.value.id }
    })
  }
}

async function loadMore () {
  showLoadMoreButton.value = await news.load()
}

const sources = computed(() => {
  const headers = '#EXTM3U\n' +
    '#EXT-X-VERSION:3\n' +
    '\n'

  const mapping = {
    SD: '720x480',
    HD: '1280x720',
    FHD: '1920x1080'
  }

  if (activeVideo.value?.video) {
    return window.URL.createObjectURL(new Blob([
      activeVideo.value.video
        .map((video) => {
          return headers +
            '#EXT-X-STREAM-INF:RESOLUTION=' + mapping[video.name] + '\n' +
            video.source + '\n'
        })
    ], { type: 'application/x-mpegurl' }))
  }
})
</script>

<template>
  <div>
    <div>
      {{ sources }}
      <n-drawer
        v-model:show="showPlayListDrawer"
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
            <play-list
              v-if="!isYoutube"
              :active-item="activeVideo"
              :items="release.episodes"
              :loading="!playerReady"
            />

            <play-list
              v-else
              :loading-more-button="news.loadingSwiper"
              :show-load-more-button="showLoadMoreButton"
              :active-item="activeVideo"
              :items="news.newsList"
              :loading="loading"
              :show-watch-button="false"
              :default-sort="isYoutube ? sortType.DESC : sortType.ASC"
              @load-more="loadMore"
            />
          </div>
        </n-drawer-content>
      </n-drawer>

      <div v-if="activeVideo">
        <video-player
          :source="!isYoutube ? { src: sources, type: 'application/x-mpegurl' } : activeVideo.url"
          :open-page-icon="isYoutube ? AppsOutline : null"
          @play="animatePausePlay(true)"
          @pause="animatePausePlay(false)"
          @open-forward="openForward"
          @open-back="$router.push({ name: 'Player', params: { video: backVideo.id } })"
          @open-page="router.push(isYoutube ? { name: 'Home' } : { name: 'Release', params: { id: route.params.id } })"
        >
          <template #loader>
            <div
              class="z-10 select-none text-center absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            >
              <img
                v-show="!playerReady"
                class="w-80"
                :src="Animations[getRandomIntInclusive(0, Animations.length - 1)]"
                alt="Loading..."
              >
              <div
                v-show="animatedPausePlay && playerReady"
                class="play-pause-circle"
                :class="{ animated: animatedPausePlay }"
              >
                <n-icon
                  class="play-pause-icon"
                  size="64"
                >
                  <play-sharp v-if="isPlay" />
                  <pause-sharp v-else />
                </n-icon>
              </div>
            </div>
          </template>
        </video-player>
      </div>
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

.play-pause-circle {
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background: rgba(120, 122, 126, 0.82);
  opacity:0;
  text-align: center;
}

.play-pause-circle.animated {
  animation: expand 2s 1 cubic-bezier(.3,1.59,.7,1.52);
  animation-fill-mode: forwards;
  transform: scale(0.1);
  opacity:1;
}

.play-pause-icon {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #FFF;
  transform: translate(-50%, -50%);
}

@keyframes expand {
  0% {
    transform: scale(0.001);
    opacity:1;
  }
  100% {
    transform: scale(1);
    opacity:0;
  }
}
</style>
