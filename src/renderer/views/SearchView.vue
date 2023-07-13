<template>
  <n-drawer
    v-model:show="showFilters"
    :width="300"
    placement="right"
  >
    <n-drawer-content title="Фильтры">
      <div>
        <n-select
          v-model:value="filters.genres"
          class="mb-2"
          placeholder="Выберите жанр"
          multiple
          :options="genresList"
        />

        <n-select
          v-model:value="filters.years"
          class="mb-2"
          placeholder="Выберите год"
          multiple
          :options="yearsList"
        />

        <n-select
          v-model:value="filters.season"
          class="mb-2"
          placeholder="Выберите сезон"
          multiple
          :options="seasonList"
        />

        <n-select
          v-model:value="filters.sort"
          class="mb-2"
          placeholder="Сортировка"
          :options="sortList"
        />

        <n-checkbox v-model:checked="filters.releaseFinished">
          Релиз завершен
        </n-checkbox>

        <div class="mt-3">
          <n-space vertical>
            <n-button
              class="w-full"
              strong
              secondary
              type="error"
              @click="clearFilters"
            >
              <template #icon>
                <n-icon>
                  <span class="mdi mdi-filter" />
                </n-icon>
              </template>
              Очистить
            </n-button>

            <n-button
              class="w-full"
              strong
              secondary
              type="success"
            >
              <template #icon>
                <n-icon>
                  <span class="mdi mdi-filter" />
                </n-icon>
              </template>
              Применить
            </n-button>
          </n-space>
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
  <div class="absolute h-full w-full flex flex-col overflow-y-hidden">
    <search-header
      class="mt-1"
      :loading="loading"
      @search="emulateLoading"
      @open-filters="openFilters"
    />
    <n-scrollbar
      ref="searchResults"
      class="p-5 pb-0 py-5 flex flex-col overflow-y-hidden"
      style="overflow-y: auto"
    >
      <n-space justify="center">
        <n-pagination
          v-model:page="page"
          :page-count="100"
          class="mb-2"
        />
      </n-space>

      <release-item
        v-for="release in releases"
        :key="release.id"
        :release-info="release"
      />
      <n-space
        justify="center"
      >
        <n-pagination
          v-model:page="page"
          :page-count="100"
          class="mt-2 mb-5"
        />
      </n-space>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import ReleaseItem from '../components/search/ReleaseItem.vue'
// import ReleaseItemLoading from '../components/search/ReleaseItemSkeleton.vue'
import SearchHeader from '../components/search/SearchHeader.vue'

const releases = ref([])
const loading = ref(true)
// const lastQuery = ref('')
const page = ref(1)
const showFilters = ref(false)

const filters = reactive({
  genres: [],
  years: [],
  season: [],
  sort: [],
  releaseFinished: false
})

const genresList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const yearsList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const seasonList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

const sortList = ref([{
  label: 'Этти',
  value: 'etti'
}, {
  label: 'Гарем',
  value: 'harem'
}])

emulateLoading()

const searchResults = ref(null)

watch(() => page.value, () => {
  emulateLoading()
  searchResults.value.scrollTo({ top: 0, behavior: 'smooth' })
})

async function emulateLoading (query = '') {
  // if (query === lastQuery.value && loading.value === false) return
  // lastQuery.value = query
  loading.value = true

  releases.value = await fetch('http://localhost:1337/sakura/search?')
    .then(data => data.json())
    .then(({ data }) => data)
  loading.value = false
}

function openFilters () {
  showFilters.value = true
}

function clearFilters () {
  filters.genres = []
  filters.years = []
  filters.season = []
  filters.sort = []
  filters.releaseFinished = []
}
</script>
