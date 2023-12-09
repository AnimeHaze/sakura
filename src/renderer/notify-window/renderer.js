import { createApp } from 'vue'
import naive from 'naive-ui'
import App from '@notify/components/App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

/* eslint-disable no-new */
const app = createApp({
  components: { App },
  template: '<App/>'
})

app.use(naive)
app.use(pinia)
app.mount('#app')
