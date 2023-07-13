import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import Profile from '../views/ProfileView.vue'
import Login from '../views/LoginView.vue'
import Release from '../views/ReleaseView.vue'
import Settings from '../views/SettingsView.vue'
import Search from '../views/SearchView.vue'

import { useUserStore } from '../store'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/profile', component: Profile, name: 'Profile' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/release', component: Release, name: 'Release' },
  { path: '/search', component: Search, name: 'Search' },
  { path: '/settings', component: Settings, name: 'Settings' },
  { path: '/', component: Home, name: 'Home' }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes // short for `routes: routes`
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
