import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  /** @type {Ref<'light'|'dark'|'auto'>} */
  const themeColor = ref('auto')
  /** @type {Ref<'light'|'dark'>} */
  const systemThemeColor = ref('dark')
  /** @type {Ref<boolean>} */
  const sidebarCollapsed = ref(true)
  /** @type {Ref<'0'|'1'>} */
  const backButtonType = ref('0')

  /** @type {Ref<'light'|'dark'>} */
  const theme = computed(() => themeColor.value === 'auto' ? systemThemeColor.value : themeColor.value)

  const collapseSidebar = () => (sidebarCollapsed.value = true)
  const expandSidebar = () => (sidebarCollapsed.value = false)
  const toggleTheme = () => (themeColor.value = themeColor.value === 'dark' ? 'light' : 'dark')
  const setTheme = (theme) => (themeColor.value = theme)

  return {
    themeColor,
    systemThemeColor,
    sidebarCollapsed,
    backButtonType,
    theme,
    collapseSidebar,
    expandSidebar,
    toggleTheme,
    setTheme
  }
})
