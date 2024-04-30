import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  /** @type {import('vue').Ref<boolean>} */
  const isPlay = ref(false)
  /** @type {import('vue').Ref<boolean>} */
  const canPlay = ref(false)
  /** @type {import('vue').Ref<boolean>} */
  const waiting = ref(false)
  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(true)
  /** @type {import('vue').Ref<number>} */
  const volume = ref(1)
  /** @type {import('vue').Ref<boolean>} */
  const muted = ref(false)
  /** @type {import('vue').Ref<boolean>} */
  const showPlayListDrawer = ref(false)
  /** @type {import('vue').Ref<object|null>} */
  const activeVideo = ref(null)
  /** @type {import('vue').Ref<object|null>} */
  const backVideo = ref({})
  /** @type {import('vue').Ref<object|null>} */
  const forwardVideo = ref(null)
  /** @type {import('vue').Ref<string>} */
  const headerText = ref('')
  /** @type {import('vue').Ref<string>} */
  const poster = ref('')
  /** @type {import('vue').Ref<boolean>} */
  const isYoutube = ref(false)
  /** @type {import('vue').Ref<boolean>} */
  const showLoadMoreButton = ref(isYoutube.value)

  /** @type {import('vue').Ref<string>} */
  const activeVideoName = computed(() => {
    if (!isYoutube.value) {
      const {
        name,
        number
      } = activeVideo.value
      let videoName = `Эпизод ${number}`
      if (name) videoName += ` (${name})`
      return videoName
    } else return ''
  })

  /** @type {import('vue').Ref<string>} */
  const backVideoName = computed(() => {
    if (backVideo.value === null) return

    if (!isYoutube.value) {
      const { name, number } = backVideo.value
      let videoName = `Эпизод ${number}`
      if (name) videoName += ` (${name})`
      return videoName
    } else {
      return backVideo.value.name
    }
  })

  /** @type {import('vue').Ref<string>} */
  const forwardVideoName = computed(() => {
    if (forwardVideo.value === null) return
    if (!isYoutube.value) {
      const {
        name,
        number
      } = forwardVideo.value
      let videoName = `Эпизод ${number}`
      if (name) videoName += ` (${name})`
      return videoName
    } else {
      return forwardVideo.value.name
    }
  })

  /**
   * Computes back / forward / active video info
   * @param {object[]} videos Playlist
   * @param {string|number} id Active Video ID
   * @return {void}
   */
  function computeMenuPlayListInfo (videos, id) {
    const activeVideoIndex = videos.findIndex(x => id.toString() === x.id.toString())
    console.log(videos, id, isYoutube.value)
    if (isYoutube.value) {
      headerText.value = videos[activeVideoIndex].name
      poster.value = videos[activeVideoIndex].preview
    }

    activeVideo.value = videos[activeVideoIndex]

    backVideo.value = videos[activeVideoIndex - 1] || null
    forwardVideo.value = videos[activeVideoIndex + 1] || null
  }

  /** @type {import('vue').Ref<boolean>} */
  const playerReady = computed(() => canPlay.value && !loading.value && !waiting.value)
  /** @type {import('vue').Ref<boolean>} */
  const forwardButtonDisabled = computed(() => (isYoutube.value ? !showLoadMoreButton.value : !forwardVideo.value) || !playerReady.value)
  /** @type {import('vue').Ref<boolean>} */
  const backButtonDisabled = computed(() => !backVideo.value || !playerReady.value)
  /** @type {import('vue').Ref<boolean>} */
  const playButtonDisabled = computed(() => !playerReady.value)

  return {
    volume,
    muted,
    activeVideo,
    activeVideoName,
    forwardVideoName,
    backVideoName,
    forwardVideo,
    backVideo,
    forwardButtonDisabled,
    backButtonDisabled,
    playButtonDisabled,
    computeMenuPlayListInfo,
    showPlayListDrawer,
    isPlay,
    canPlay,
    waiting,
    loading,
    playerReady,
    isYoutube,
    headerText,
    poster,
    showLoadMoreButton
  }
})
