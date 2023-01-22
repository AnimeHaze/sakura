import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    /** @type {
     {
       authToken: {
         authToken: string|null
       },
       name: string,
       id: number,
       comments: number,
       likes: number,
       friends: number,
       views: number,
       avatar: string
     }
    } */
    authToken: null,
    information: {
      id: 0,
      avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      name: '',
      comments: 0,
      friends: 0,
      likes: 0,
      views: 0
    }
  }),
  getters: {},
  actions: {
    // any amount of arguments, return a promise or not
    incrementComments (count = 1) {
      this.information.comments += count
    }
  }
})
