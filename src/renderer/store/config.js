import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { appTheme, backButton } from '@enums/index'

export const useConfigStore = defineStore('config', () => {
  /** @type {import('vue').Ref<'light'|'dark'|'auto'>} */
  const themeColor = ref(appTheme.AUTO)
  /** @type {import('vue').Ref<'light'|'dark'>} */
  const systemThemeColor = ref(appTheme.DARK)
  /** @type {import('vue').Ref<boolean>} */
  const sidebarCollapsed = ref(true)
  /** @type {import('vue').Ref<'0'|'1'>} */
  const backButtonType = ref(backButton.REPLACE_CATALOG)
  /** @type {import('vue').Ref<boolean>} */
  const sidebarDiceLoading = ref(false)
  /** @type {import('vue').Ref<'light'|'dark'>} */
  const theme = computed(() => themeColor.value === appTheme.AUTO ? systemThemeColor.value : themeColor.value)

  const collapseSidebar = () => (sidebarCollapsed.value = true)
  const expandSidebar = () => (sidebarCollapsed.value = false)
  const toggleTheme = () => (themeColor.value = themeColor.value === appTheme.DARK ? appTheme.LIGHT : appTheme.DARK)
  const setTheme = (theme) => (themeColor.value = theme)

  const setDiceLoading = value => (sidebarDiceLoading.value = value)

  return {
    sidebarDiceLoading,
    themeColor,
    systemThemeColor,
    sidebarCollapsed,
    backButtonType,
    theme,
    collapseSidebar,
    expandSidebar,
    toggleTheme,
    setTheme,
    setDiceLoading
  }
})
