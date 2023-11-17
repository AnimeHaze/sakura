import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 @typedef Information {Ref<Object>}
 @property {string} name
 @property {number} id
 @property {number} comments
 @property {number} likes
 @property {number} friends
 @property {number} views
 @property {string} avatar
 */

export const useUserStore = defineStore('user', () => {
  /** @type {Ref<string|null>} **/
  const authToken = ref(null)
  const information = ref({
    id: 0,
    avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
    name: '',
    comments: 0,
    friends: 0,
    likes: 0,
    views: 0
  })

  /**
   * @type {Ref<Array<{ title: string, id: string }>>}
   */
  const userLists = ref([])
  const userListsForSelect = computed(() => userLists.value
    .map(({ title, id }) => ({ label: title, value: id })))

  const isAuthorized = computed(() => authToken.value !== null)
  const incrementComments = (count = 1) => (information.value.comments += count)
  const logout = () => (authToken.value = null)
  const login = async (username, password) => {
    authToken.value = 'test'
    await fetchUserLists()
    return true
  }

  const fetchUserLists = async () => (userLists.value = await window.api.getUserLists())
  const createUserList = async (title) => {
    await window.api.createUserList({ title })
    await fetchUserLists()
  }

  return {
    isAuthorized,
    information,
    authToken,
    incrementComments,
    logout,
    login,
    userLists,
    userListsForSelect,
    createUserList,
    fetchUserLists
  }
})
