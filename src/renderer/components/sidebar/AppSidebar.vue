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
import { computed, h } from 'vue'
import { NAvatar, NIcon, useDialog } from 'naive-ui'
import {
  AppsOutline, BookmarkOutline, BugOutline, CaretDownOutline,
  InformationCircleOutline, SearchOutline, SettingsOutline,
  SyncCircle, TerminalOutline, LogOutOutline
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import { useConfigStore, useUserStore } from '../../store'
import ThemeIcon from './ThemeIcon.vue'

const config = useConfigStore()
const user = useUserStore()
const router = useRouter()
const dialog = useDialog()

const mappingKeys = {
  Home: 'catalog',
  Profile: 'profile',
  About: 'about'
}

const selectedKey = computed(() => mappingKeys[router.currentRoute.value.name] ?? null)

const menuOptions = computed(() => [
  { label: 'Каталог', key: 'catalog', href: '/' },
  { label: 'AniCoder', key: 'profile', href: '/profile' },
  { label: 'Избранное', key: 'favorite' },
  { label: 'Поиск', key: 'search' },
  { label: 'Тема', key: 'theme' },
  {
    label: 'Настройки',
    key: 'settings',
    children: [
      { label: 'Синхронизации', key: 'sync' }
    ]
  },
  { label: 'О приложении', key: 'about', href: '/about' },
  { label: 'Выйти из аккаунта', key: 'logout', show: user.isAuthorized },
  {
    label: 'Отладка',
    key: 'debug',
    children: [
      { label: 'Открыть консоль', key: 'devtools' }
    ],
    show: window.api.isDev()
  }
])

function expandIcon () {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}

function handleClick (key, option) {
  if (option.href) { router.push(option.href) }
  if (key === 'logout') {
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
  if (key === 'theme') { config.toggleTheme() }
  if (key === 'devtools') { window.api.toggleDevtools() }
}

function renderMenuIcon (option) {
  if (option.key === 'catalog') { return h(NIcon, null, { default: () => h(AppsOutline) }) }
  if (option.key === 'settings') { return h(NIcon, null, { default: () => h(SettingsOutline) }) }
  if (option.key === 'search') { return h(NIcon, null, { default: () => h(SearchOutline) }) }
  if (option.key === 'debug') { return h(NIcon, null, { default: () => h(BugOutline) }) }
  if (option.key === 'sync') { return h(NIcon, null, { default: () => h(SyncCircle) }) }
  if (option.key === 'theme') { return h(NIcon, {}, { default: () => h(ThemeIcon) }) }
  if (option.key === 'devtools') { return h(NIcon, {}, { default: () => h(TerminalOutline) }) }
  if (option.key === 'logout') { return h(NIcon, {}, { default: () => h(LogOutOutline) }) }
  if (option.key === 'profile') {
    return h(NAvatar, {
      size: 'small',
      src: user.information.avatar,
      round: true
    })
  }
  if (option.key === 'about') { return h(InformationCircleOutline, null) }
  if (option.key === 'favorite') { return h(NIcon, null, { default: () => h(BookmarkOutline) }) }
}
</script>
