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

let request = 0

window.api = new Proxy(window._api, {
  get: (target, property, receiver) => {
    const prop = Reflect.get(target, property, receiver)

    if (prop) {
      return prop
    }

    return function (options) {
      const reqId = ++request
      console.log(
        '[%d] Call API: %c%s:',
        reqId,
        'color: #FFFFFF;font-size: 12px;background: #174919;padding: 2px;',
        property
      )
      console.table(options)

      const response = window._api.callApi(property, options)

      Promise.resolve(response)
        .then(x => console.log('[%d] Response: %o', reqId, x))

      return response
    }
  }
})

app.use(createManager())
app.use(naive)
app.use(pinia)
app.use(router)

app.mount('#app')
// devtools.connect()
