import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { appTheme, backButton } from '../../enums'

export const useConfigStore = defineStore('config', () => {
  /** @type {Ref<'light'|'dark'|'auto'>} */
  const themeColor = ref(appTheme.AUTO)
  /** @type {Ref<'light'|'dark'>} */
  const systemThemeColor = ref(appTheme.DARK)
  /** @type {Ref<boolean>} */
  const sidebarCollapsed = ref(true)
  /** @type {Ref<'0'|'1'>} */
  const backButtonType = ref(backButton.REPLACE_CATALOG)
  /** @type {Ref<boolean>} */
  const sidebarDiceLoading = ref(false)
  /** @type {Ref<'light'|'dark'>} */
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
