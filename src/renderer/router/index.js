import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Profile from '../views/ProfileView.vue'
import Login from '../views/LoginView.vue'
import Release from '../views/ReleaseView.vue'
import Settings from '../views/SettingsView.vue'
import Search from '../views/SearchView.vue'
import Player from '../views/PlayerView.vue'

import { useUserStore } from '../store'

const routes = [
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/release/:id', component: Release, name: 'Release' },
  { path: '/release/:id/:episode', component: Player, name: 'Player' },
  { path: '/search', component: Search, name: 'Search' },
  { path: '/settings', component: Settings, name: 'Settings' },
  { path: '/', component: Home, name: 'Home' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const user = useUserStore()
  const isAuthenticated = user.authToken !== null

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
