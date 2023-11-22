import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const filtersList = ref([])

  /**
   * @typedef {object} Filters
   * @property {string} text Text to search
   * @property {number} page Current page
   * @property {boolean} releaseFinished If `true` show only finished releases
   * @property {string[]} genres Array of genres to  search
   * @property {string[]} season Array of seasons to search
   * @property {null|string} sort Results sort type
   * @property {string[]} years Array of years to search
   */

  /**
   * Filters object
   * @type {import('vue').Ref<Filters>}
   */
  const filters = ref({
    genres: [],
    years: [],
    season: [],
    sort: null,
    releaseFinished: false,
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
    filters, clearFilters, restoreFiltersState, resetPage, fetchFilters, filtersList
  }
})
