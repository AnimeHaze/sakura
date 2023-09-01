import './style/index.css'
import 'windi.css'
import '@mdi/font/css/materialdesignicons.min.css'
// import Vue from '../node_modules/vue/dist/vue.esm.browser.min.js';
//
// new Vue({
//   el: '#app',
//   data: {
//     message: '111'
//   }
// });

// import devtools from '@vue/devtools'

import { createApp } from 'vue'
import { createManager } from '@vue-youtube/core'
import naive from 'naive-ui'
import App from '../renderer/components/App.vue'
import { router } from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

/* eslint-disable no-new */
const app = createApp({
  components: { App },
  template: '<App/>'
})

app.use(createManager())
app.use(naive)
app.use(pinia)
app.use(router)

app.mount('#app')
// devtools.connect()
