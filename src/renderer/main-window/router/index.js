import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import About from '@/views/AboutView.vue'
import Profile from '@/views/ProfileView.vue'
import Login from '@/views/LoginView.vue'
import Release from '@/views/ReleaseView.vue'
import Settings from '@/views/SettingsView.vue'
import Search from '@/views/SearchView.vue'
import Player from '@/views/PlayerView.vue'
import NotFound from '@/views/NotFoundView.vue'

import { useUserStore, useConfigStore } from '@/store'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import PlayerLayout from '@/layouts/PlayerLayout.vue'
import Schedule from '@/views/ScheduleView.vue'

const routes = [
  {
    path: '/player/',
    component: PlayerLayout,
    children: [
      { path: '/:id/:episode', component: Player, name: 'Player' }
    ]
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/schedule', component: Schedule, name: 'Schedule' },
      { path: '/profile', component: Profile, name: 'Profile' },
      { path: '/about', component: About, name: 'About' },
      { path: '/login', component: Login, name: 'Login' },
      { path: '/release/:id', component: Release, name: 'Release' },
      { path: '/search', component: Search, name: 'Search' },
      { path: '/settings', component: Settings, name: 'Settings' },
      { path: '/', component: Home, name: 'Home' },
      { path: '/:pathMatch(.*)', component: NotFound, name: 'NotFound' }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const user = useUserStore()
  const config = useConfigStore()
  const isAuthenticated = user.authToken !== null

  if (!config.onLine && to.name !== 'Offline') return { name: 'Offline' }

  if (
    !user.authToken &&
    to.name !== 'Login' && ['Profile'].includes(to.name)
  ) {
    return { name: 'Login' }
  }

  if (isAuthenticated && to.name === 'Login') {
    return { name: 'Home' }
  }
})
