import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
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
    filters.value.text = ''
    filters.value.genres = []
    filters.value.years = []
    filters.value.season = []
    filters.value.sort = null
    filters.value.releaseFinished = false
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

  return {
    genresList, yearsList, seasonList, sortList, filters, clearFilters, restoreFiltersState, resetPage
  }
})
