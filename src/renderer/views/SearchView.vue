<template>
  <div>
    <filters-drawer v-model:show-filters="showFilters" />
    <div class="absolute h-full w-full flex flex-col overflow-y-hidden">
      <search-header
        v-model:query="search.filters.text"
        class="mt-1"
        :loading="loading"
        @open-filters="showFilters = true"
      />

      <n-scrollbar
        ref="searchResultsRef"
        class="p-5 pb-0 py-5 flex flex-col overflow-y-hidden w-auto"
        style="overflow-y: auto"
      >
        <n-space
          justify="center"
        >
          <n-pagination
            v-show="releases.length"
            v-model:page="search.filters.page"
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

        <div
          v-show="!loading && releases.length"
        >
          <release-item
            v-for="release in releases"
            :key="release.id"
            :release-info="release"
            :user-lists="user.userListsForSelect"
          />
        </div>

        <NotFound v-show="!loading && !releases.length" />

        <n-space
          justify="center"
        >
          <n-pagination
            v-show="releases.length"
            v-model:page="search.filters.page"
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
import { useSearchStore, useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import NotFound from '../components/search/NotFound.vue'

const router = useRouter()
const route = useRoute()
const user = useUserStore()
const search = useSearchStore()

const releases = ref([])
const loading = ref(true)
const pagesCount = ref(1)

const showFilters = ref(false)
/** @type {Ref<HTMLElement|null>} */
const searchResultsRef = ref(null)

watch(() => search.filters, () => {
  loading.value = true
  if (debounceTimeout) clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    console.log(999, JSON.stringify(search.filters))
    router.replace({
      query: {
        q: JSON.stringify(search.filters)
      }
    })

    load()
      .then(() => {
        searchResultsRef.value?.scrollTo({ top: 0, behavior: 'smooth' })
        loading.value = false
      })

    debounceTimeout = null
  }, 1000)
}, { deep: true })

let debounceTimeout = null

watch(() => route.query, () => {
  if (!route.query.q) search.clearFilters()
})

onMounted(async () => {
  await search.fetchFilters()

  search.restoreFiltersState(route.query)
  loading.value = true
  await load()
  loading.value = false
})

/**
 * Load releases
 * @return {Promise<void>}
 */
async function load () {
  const { result, pages } = await window.api.searchReleases({ filters: { year: 2023 }, search: search.filters.text, page: search.filters.page, limit: 20 })

  releases.value = result
  pagesCount.value = pages
}
</script>
