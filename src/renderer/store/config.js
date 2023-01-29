import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    /** @type {'light'|'dark'|'auto'} */
    themeColor: 'auto',
    /** @type {'light'|'dark'} **/
    systemThemeColor: 'dark',
    /** @type {boolean} **/
    sidebarCollapsed: true,
    /** @type {'0'|'1'} **/
    backButtonType: '0'
  }),
  getters: {
    theme () {
      return this.themeColor === 'auto' ? this.systemThemeColor : this.themeColor
    }
  },
  actions: {
    collapseSidebar () {
      this.sidebarCollapsed = true
    },
    expandSidebar () {
      this.sidebarCollapsed = false
    },
    toggleTheme () {
      this.themeColor = this.themeColor === 'dark' ? 'light' : 'dark'
    },
    /** @param theme {'light'|'dark'|'auto'} **/
    setTheme (theme) {
      this.themeColor = theme
    }
  }
})
