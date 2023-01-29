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

  const isAuthorized = computed(() => authToken.value !== null)
  const incrementComments = (count = 1) => (information.value.comments += count)
  const logout = () => (authToken.value = null)

  return {
    isAuthorized,
    information,
    authToken,
    incrementComments,
    logout
  }
})
