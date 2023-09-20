<script setup>
import ReleaseEpisode from './ReleaseEpisode.vue'
import { NIcon } from 'naive-ui'
import { SwapVerticalOutline } from '@vicons/ionicons5'
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'

const properties = defineProps({
  episodes: {
    type: Array,
    required: true
  }
})

const fuse = new Fuse(properties.episodes, {
  keys: [
    'name',
    {
      name: 'number',
      weight: 2
    }
  ]
})

const sort = { ASC: 0, DESC: 1 }

const sortDeg = ref(0)
const sortType = ref(sort.ASC)
const searchQuery = ref('')

const searchedEpisodes = computed(() => searchQuery.value ? fuse.search(searchQuery.value).map(x => x.item) : properties.episodes)

const sortedEpisodes = computed(() => {
  const episodes = [...searchedEpisodes.value].sort((a, b) => b.number - a.number)
  return sortType.value === sort.ASC ? [...episodes].reverse() : episodes
})

function changeWatched (id) {
  const episode = properties.episodes.find(x => x.id === id)
  console.log(id)
  episode.watched = !episode.watched
}

function swapSort () {
  sortDeg.value += 360
  sortType.value = sortType.value === sort.ASC ? sort.DESC : sort.ASC
}
</script>

<template>
  <div class="flex">
    <div class="flex-none">
      <n-button
        strong
        secondary
        @click="swapSort()"
      >
        <n-icon
          size="24"
          class="transition"
          :style="{ transform: `rotate(${sortDeg}deg)` }"
        >
          <SwapVerticalOutline />
        </n-icon>
      </n-button>
    </div>

    <n-input
      v-model:value="searchQuery"
      class="mb-2 ml-2 w-full"
      type="text"
      placeholder="Поиск по сериям"
    />
  </div>

  <ReleaseEpisode
    v-for="episode in sortedEpisodes"
    :key="episode.id"
    :episode-id="episode.id"
    :episode-number="episode.number"
    :resolutions="[360, 720, 1080]"
    :watched="episode.watched"
    :date="new Date(episode.createdAt * 1000).toLocaleString()"
    :name="episode.name"
    @change-watch-status="changeWatched(episode.id)"
    @open="() => {}"
  />
</template>

<style scoped>
.episode {
  background: rgb(102 102 102 / 18%);
}

.episode:hover {
  background: rgb(102 102 102 / 13%);
}

.transition {
  transition: transform 0.5s ease-in-out;
}
</style>
