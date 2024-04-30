<script setup>
import PlayListItem from './PlayListItem.vue'
import { NIcon } from 'naive-ui'
import { SwapVerticalOutline } from '@vicons/ionicons5'
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'
import { sortType } from '@enums/index'

defineEmits(['loadMore'])

const properties = defineProps({
  items: {
    type: Array,
    required: true
  },
  activeItem: {
    type: Object,
    required: false
  },
  showWatchButton: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  showLoadMoreButton: {
    type: Boolean,
    default: false
  },
  loadingMoreButton: {
    type: Boolean,
    default: false
  },
  defaultSort: {
    type: Number,
    validate: v => [sortType.ASC, sortType.DESC].includes(v),
    required: false,
    default: sortType.ASC
  }
})

const fuse = new Fuse(properties.items, {
  keys: [
    'name',
    {
      name: 'number',
      weight: 2
    }
  ]
})

const sortDeg = ref(0)
const sort = ref(properties.defaultSort)
const searchQuery = ref('')

const searchedItems = computed(() => searchQuery.value ? fuse.search(searchQuery.value).map(x => x.item) : properties.items)

const sortedItems = computed(() => {
  return [...searchedItems.value].sort((a, b) => b.number - a.number)
})

function changeWatched (id) {
  const item = properties.items.find(x => x.id === id)
  item.watched = !item.watched
}

function swapSort () {
  sortDeg.value += 360
  sort.value = sort.value === sortType.ASC ? sortType.DESC : sortType.ASC
}
</script>

<template>
  <div>
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
        placeholder="Поиск..."
        clearable
      />
    </div>

    <n-divider class="n-divider" />

    <div
      class="flex"
      :style="{ 'flex-direction': sort === sortType.ASC ? 'column-reverse' : 'column'}"
    >
      <play-list-item
        v-for="item in sortedItems"
        :id="item.id"
        :key="item.id"
        :loading="loading"
        :active="activeItem?.id === item.id"
        :number="item.number"
        :resolutions="[360, 720, 1080]"
        :watched="item.watched"
        :show-watch-button="showWatchButton"
        :date="item.createdAt"
        :name="item.name"
        @change-watch-status="changeWatched(item.id)"
        @open="$router.push({ name: 'Player', params: { video: item.id } })"
      />
    </div>

    <n-button
      v-if="showLoadMoreButton"
      :loading="loadingMoreButton"
      class="w-full"
      size="large"
      strong
      secondary
      @click="$emit('loadMore')"
    >
      Загрузить еще
    </n-button>
  </div>
</template>

<style scoped>
.transition {
  transition: transform 0.5s ease-in-out;
}

.n-divider:not(.n-divider--vertical) {
  margin-top: 8px;
  margin-bottom: 13px;
}
</style>
