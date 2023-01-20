import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    /** @type {'light'|'dark'} */
    theme: 'dark',
    sidebarCollapsed: true
  }),
  getters: {},
  actions: {
    collapseSidebar () {
      this.sidebarCollapsed = true
    },
    expandSidebar () {
      this.sidebarCollapsed = false
    },
    toggleTheme () {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    }
  }
})
