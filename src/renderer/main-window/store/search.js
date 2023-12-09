import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const filtersList = ref([])
  const filtersActive = ref(0)

  /**
   * @typedef {object} Filters
   * @property {string} text Text to search
   * @property {number} page Current page
   */

  /**
   * Filters object
   * @type {import('vue').Ref<Filters>}
   */
  const filters = ref({
    text: '',
    page: 1
  })

  function resetPage () {
    filters.value.page = 1
  }

  function clearFilters () {
    filters.value.page = 1
    filters.value.text = ''

    for (const filterData of filtersList.value) {
      filters.value[filterData.id] = filterData.default
    }
  }

  function restoreFiltersState ({ q }) {
    console.log('Restore state', q)

    try {
      if (q) {
        const data = JSON.parse(q)

        filters.value = { ...filters.value, ...data }
      } else clearFilters()
    } catch (error) {
      console.log('Invalid search query cursor', q, error)
    }
  }

  /**
   * Fetches filters and rebuild ref object
   * @return {Promise<void>}
   */
  async function fetchFilters () {
    filtersList.value = await window.api.getSearchFilters()

    // Remove all props
    for (const prop in filters.value) {
      if (!['page', 'text'].includes(prop)) delete filters.value[prop]
    }

    for (const filterData of filtersList.value) {
      filters.value[filterData.id] = filterData.default
    }
  }

  return {
    filters, clearFilters, restoreFiltersState, resetPage, fetchFilters, filtersList, filtersActive
  }
})
