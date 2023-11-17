<template>
  <div>
    <filters-drawer ref="filters" />
    <div class="absolute h-full w-full flex flex-col overflow-y-hidden">
      <search-header
        class="mt-1"
        :loading="loading"
        @search="load"
        @open-filters="filters.openFilters()"
      />
      <n-scrollbar
        ref="searchResults"
        class="p-5 pb-0 py-5 flex flex-col overflow-y-hidden w-auto"
        style="overflow-y: auto"
      >
        <n-space justify="center">
          <n-pagination
            v-model:page="page"
            :page-count="pagesCount"
            class="mb-2"
          />
        </n-space>

        <div v-show="loading">
          <release-item-skeleton
            v-for="release in 20"
            :key="release"
          />
        </div>

        <div v-show="!loading">
          <release-item
            v-for="release in releases"
            :key="release.id"
            :release-info="release"
          />
        </div>

        <n-space
          justify="center"
        >
          <n-pagination
            v-model:page="page"
            :page-count="pagesCount"
            class="mt-2 mb-5"
          />
        </n-space>
      </n-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import ReleaseItem from '../components/search/ReleaseItem.vue'
import SearchHeader from '../components/search/SearchHeader.vue'
import FiltersDrawer from '../components/search/FiltersDrawer.vue'
import ReleaseItemSkeleton from '../components/search/ReleaseItemSkeleton.vue'

const releases = ref([])
const loading = ref(true)
// const lastQuery = ref('')
const page = ref(1)
const pagesCount = ref(1)
const filters = ref(null)

const currentQuery = ref('')

const searchResults = ref(null)

watch(() => page.value, () => {
  load(currentQuery.value)
  searchResults.value.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(async () => {
  await load()
})

async function load (query) {
  currentQuery.value = query
  // if (query === lastQuery.value && loading.value === false) return
  // lastQuery.value = query
  loading.value = true

  const { result, pages } = await window.api.searchReleases({ filters: { year: 2023 }, search: query, page: page.value, limit: 20 })

  // releases.value = await fetch('http://localhost:1337/sakura/search?')
  //   .then(data => data.json())
  //   .then(({ data }) => data)
  releases.value = result
  pagesCount.value = pages

  loading.value = false
}
</script>
