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
        <back-top-button />
        <n-space
          justify="center"
        >
          <n-pagination
            v-show="releases.length"
            v-model:page="search.filters.page"
            :disabled="loading"
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
            :disabled="loading"
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
import ReleaseItem from '@/components/search/ReleaseItem.vue'
import SearchHeader from '@/components/search/SearchHeader.vue'
import FiltersDrawer from '@/components/search/FiltersDrawer.vue'
import ReleaseItemSkeleton from '@/components/search/ReleaseItemSkeleton.vue'
import { useSearchStore, useUserStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import NotFound from '@/components/search/NotFound.vue'
import BackTopButton from '@/components/app/BackTopButton.vue'

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
    let qs = []

    // Remove default values from url (make shorter)
    for (const filterData of search.filtersList) {
      const filterValue = search.filters[filterData.id]
      if (Array.isArray(filterValue) && filterValue.toString() === filterData.default?.toString()) continue
      if (filterValue === filterData.default) continue

      qs.push([filterData.id, search.filters[filterData.id]])
    }

    qs = Object.fromEntries(
      qs.filter(filter => {
        const { dependsOn } = search.filtersList.find(x => x.id === filter[0])
        if (!dependsOn) return true

        return qs.find(([key]) => key === dependsOn) !== undefined
      })
    )

    const hasFilters = Object.keys(qs).length
    search.filtersActive = hasFilters

    if (search.filters.page) qs.page = search.filters.page
    if (search.filters.text) qs.text = search.filters.text

    router.replace({
      query:
        hasFilters || qs.page || qs.text
          ? {
              q: JSON.stringify(qs)
            }
          : undefined
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
  const { result, pages } = await window.api.searchReleases({
    // Ad-hok :D, sometimes toRaw works fine, but IPC can't clone array Proxy, serialisation works fine
    // TODO: I think I can find a good solution, but I am so lazy...
    filters: JSON.parse(JSON.stringify(search.filters)),
    limit: 20
  })

  releases.value = result
  pagesCount.value = pages
}
</script>
