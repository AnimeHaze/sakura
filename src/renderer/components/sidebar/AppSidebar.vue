<template>
  <n-layout-sider
    class="z-2"
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="config.sidebarCollapsed"
    show-trigger
    @collapse="config.collapseSidebar"
    @expand="config.expandSidebar"
  >
    <n-menu
      :value="selectedKey"
      :collapsed="config.sidebarCollapsed"
      :collapsed-width="64"
      :collapsed-icon-size="28"
      :options="menuOptions"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
      @update:value="handleClick"
    />
  </n-layout-sider>
</template>

<script setup>
import { computed, h, ref, watch } from 'vue'
import { NAvatar, NIcon, useDialog } from 'naive-ui'
import {
  AppsOutline, BookmarkOutline, BugOutline, CaretDownOutline,
  InformationCircleOutline, SearchOutline, SettingsOutline,
  TerminalOutline, LogOutOutline, ArrowBackOutline
} from '@vicons/ionicons5'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore, useUserStore } from '../../store'
import ThemeIcon from './ThemeIcon.vue'
import { appSidebar, appTheme, backButton } from '../../../enums'

const config = useConfigStore()
const user = useUserStore()
const router = useRouter()
const dialog = useDialog()
const route = useRoute()

const showBack = ref(false)

watch(() => route.name, () => {
  showBack.value = ['Release'].includes(route.name)
})

const mappingKeys = {
  Home: appSidebar.CATALOG,
  Profile: appSidebar.PROFILE,
  About: appSidebar.ABOUT
}

const selectedKey = computed(() => mappingKeys[route.name] ?? null)
const showCatalog = computed(() => !(showBack.value && config.backButtonType === backButton.REPLACE_CATALOG))

const menuOptions = computed(() => [
  { label: 'Назад', key: appSidebar.BACK, show: showBack.value },
  { label: 'Каталог', key: appSidebar.CATALOG, href: '/', show: showCatalog.value },
  { label: 'AniCoder', key: appSidebar.PROFILE, href: '/profile' },
  { label: 'Избранное', key: appSidebar.FAVORITE },
  { label: 'Поиск', key: appSidebar.SEARCH },
  { label: 'Тема', key: appSidebar.THEME },
  { label: 'Настройки', key: appSidebar.SETTINGS, href: '/settings' },
  { label: 'О приложении', key: appSidebar.ABOUT, href: '/about' },
  { label: 'Выйти из аккаунта', key: appSidebar.LOGOUT, show: user.isAuthorized },
  {
    label: 'Отладка',
    key: appSidebar.DEBUG,
    children: [
      { label: 'Открыть консоль', key: appSidebar.DEVTOOLS }
    ],
    show: window.api.isDev()
  }
])

function expandIcon () {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}

function handleClick (key, option) {
  if (option.href) { router.push(option.href) }
  if (key === appSidebar.LOGOUT) {
    dialog.warning({
      title: 'Подтверждение',
      content: 'Вы хотите выйти?',
      positiveText: 'Да',
      negativeText: 'Отмена',
      onPositiveClick: () => {
        user.logout()
        router.push({ name: 'Home' })
      },
      onNegativeClick: () => {}
    })
  }
  if (key === appSidebar.THEME) {
    if (config.themeColor === appTheme.AUTO) {
      dialog.warning({
        title: 'Подтверждение',
        content: 'Сейчас тема привязана к системной, вы действительно хотите ее изменить?',
        positiveText: 'Да',
        negativeText: 'Отмена',
        onPositiveClick: () => {
          const theme = config.theme === appTheme.DARK ? appTheme.LIGHT : appTheme.DARK
          config.setTheme(theme)
        },
        onNegativeClick: () => {}
      })
    } else {
      config.toggleTheme()
    }
  }
  if (key === appSidebar.DEBUG) { window.api.toggleDevtools() }
  if (key === appSidebar.BACK) { router.back() }
}

function renderMenuIcon (option) {
  if (option.key === appSidebar.BACK) { return h(NIcon, null, { default: () => h(ArrowBackOutline) }) }
  if (option.key === appSidebar.CATALOG) { return h(NIcon, null, { default: () => h(AppsOutline) }) }
  if (option.key === appSidebar.SETTINGS) { return h(NIcon, null, { default: () => h(SettingsOutline) }) }
  if (option.key === appSidebar.SEARCH) { return h(NIcon, null, { default: () => h(SearchOutline) }) }
  if (option.key === appSidebar.DEBUG) { return h(NIcon, null, { default: () => h(BugOutline) }) }
  if (option.key === appSidebar.THEME) { return h(NIcon, {}, { default: () => h(ThemeIcon) }) }
  if (option.key === appSidebar.DEVTOOLS) { return h(NIcon, {}, { default: () => h(TerminalOutline) }) }
  if (option.key === appSidebar.LOGOUT) { return h(NIcon, {}, { default: () => h(LogOutOutline) }) }
  if (option.key === appSidebar.PROFILE) {
    return h(NAvatar, {
      size: 'small',
      src: user.information.avatar,
      round: true
    })
  }
  if (option.key === appSidebar.ABOUT) { return h(InformationCircleOutline, null) }
  if (option.key === appSidebar.FAVORITE) { return h(NIcon, null, { default: () => h(BookmarkOutline) }) }
}
</script>
