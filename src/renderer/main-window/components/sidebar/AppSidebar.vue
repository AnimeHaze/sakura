<template>
  <n-layout-sider
    class="z-20"
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
import { NAvatar, NIcon, useDialog, useNotification } from 'naive-ui'
import {
  AppsOutline, BookmarkOutline, BugOutline, CaretDownOutline,
  InformationCircleOutline, SearchOutline, SettingsOutline,
  TerminalOutline, LogOutOutline, ArrowBackOutline, CalendarOutline, TimeOutline
} from '@vicons/ionicons5'
import DiceIcon from './DiceIcon.vue'

import { useRoute, useRouter } from 'vue-router'
import { useConfigStore, useUserStore } from '@/store'
import ThemeIcon from './ThemeIcon.vue'
import { appSidebar, appTheme, backButton } from '@enums/index'

const config = useConfigStore()
const user = useUserStore()
const router = useRouter()
const dialog = useDialog()
const route = useRoute()
const notification = useNotification()

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

const generateOption = (label, key, href, show) => ({ label, key, href, show })

const menuOptions = computed(() => [
  generateOption('Назад', appSidebar.BACK, null, showBack.value),
  generateOption('Каталог', appSidebar.CATALOG, '/', showCatalog.value),
  generateOption('AniCoder', appSidebar.PROFILE, '/profile'),
  generateOption('Избранное', appSidebar.FAVORITE),
  generateOption('Поиск', appSidebar.SEARCH, '/search'),
  generateOption('Случайное аниме', appSidebar.RANDOM_ANIME, null),
  generateOption('Расписание', appSidebar.SCHEDULE, '/schedule'),
  generateOption('История просмотра', appSidebar.RECENT, '/recent'),
  generateOption('Тема', appSidebar.THEME),
  generateOption('Настройки', appSidebar.SETTINGS, '/settings'),
  generateOption('О приложении', appSidebar.ABOUT, '/about'),
  generateOption('Выйти из аккаунта', appSidebar.LOGOUT, null, user.isAuthorized),
  {
    label: 'Отладка',
    key: appSidebar.DEVTOOLS,
    children: [
      generateOption('Открыть консоль', appSidebar.DEBUG)
    ],
    show: window.api.isDev()
  }
])

function handleLogout () {
  dialog.warning({
    title: 'Подтверждение',
    content: 'Вы хотите выйти?',
    positiveText: 'Да',
    negativeText: 'Отмена',
    onPositiveClick: () => {
      user.logout()
      router.push({ name: 'Home' })
    }
  })
}

function handleThemeChange () {
  if (config.themeColor === appTheme.AUTO) {
    dialog.warning({
      title: 'Подтверждение',
      content: 'Сейчас тема привязана к системной, вы действительно хотите ее изменить?',
      positiveText: 'Да',
      negativeText: 'Отмена',
      onPositiveClick: () => {
        const theme = config.theme === appTheme.DARK ? appTheme.LIGHT : appTheme.DARK
        config.setTheme(theme)
      }
    })
  } else {
    config.toggleTheme()
  }
}

const expandIcon = () => h(NIcon, null, { default: () => h(CaretDownOutline) })
const handleDebug = () => window.api.toggleDevtools()
const handleBack = () => router.back()
const handleRandom = async () => {
  if (config.sidebarDiceLoading) return

  config.setDiceLoading(true)
  try {
    const { result: id } = await window.api.getRandomRelease()
    await router.push({ name: 'Release', params: { id } })
  } catch (error) {
    console.log(error)
    notification.create({
      type: 'error',
      content: 'Ошибка получения случайного релиза',
      closable: true,
      duration: 3000
    })
  } finally {
    config.setDiceLoading(false)
  }
}

const actionMap = {
  [appSidebar.LOGOUT]: handleLogout,
  [appSidebar.THEME]: handleThemeChange,
  [appSidebar.DEBUG]: handleDebug,
  [appSidebar.BACK]: handleBack,
  [appSidebar.RANDOM_ANIME]: handleRandom
}

function handleClick (key, option) {
  if (option.href) { router.push(option.href) }
  // eslint-disable-next-line security/detect-object-injection
  if (actionMap[key]) actionMap[key]()
}

function renderIcon (key) {
  return iconMap[key]
}

function renderMenuIcon (option) {
  if (option.key === appSidebar.PROFILE) {
    return h(NAvatar, {
      size: 'small',
      src: user.information.avatar,
      round: true
    })
  }
  return renderIcon(option.key)
}

function wrapIcon (icon) {
  return h(NIcon, null, { default: () => h(icon) })
}

const iconMap = {
  [appSidebar.BACK]: wrapIcon(ArrowBackOutline),
  [appSidebar.CATALOG]: wrapIcon(AppsOutline),
  [appSidebar.SETTINGS]: wrapIcon(SettingsOutline),
  [appSidebar.RANDOM_ANIME]: wrapIcon(DiceIcon),
  [appSidebar.SEARCH]: wrapIcon(SearchOutline),
  [appSidebar.DEVTOOLS]: wrapIcon(BugOutline),
  [appSidebar.THEME]: wrapIcon(ThemeIcon),
  [appSidebar.ABOUT]: wrapIcon(InformationCircleOutline),
  [appSidebar.DEBUG]: wrapIcon(TerminalOutline),
  [appSidebar.LOGOUT]: wrapIcon(LogOutOutline),
  [appSidebar.FAVORITE]: wrapIcon(BookmarkOutline),
  [appSidebar.SCHEDULE]: wrapIcon(CalendarOutline),
  [appSidebar.RECENT]: wrapIcon(TimeOutline)
}
</script>
