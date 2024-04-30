import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsStore = defineStore('news', () => {
  const page = ref(1)
  const newsList = ref([])
  // const showModal = ref(false)
  // const ytInfo = ref({})
  const loadingSwiper = ref(true)

  async function load () {
    loadingSwiper.value = true
    const { result } = await window.api.getNews({ page: page.value, limit: 20 })
    newsList.value.push(...result)
    page.value++
    loadingSwiper.value = false

    return result.length > 0
  }

  return {
    page,
    newsList,
    // showModal,
    // ytInfo,
    loadingSwiper,
    load
  }
})
