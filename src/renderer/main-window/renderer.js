import '../assets/index.css'
import 'vidstack/icons'
import '@mdi/font/css/materialdesignicons.min.css'
import { createApp } from 'vue'
import { createManager } from '@vue-youtube/core'
import naive from 'naive-ui'
import App from '@/components/App.vue'
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

      if (options) {
        console.table(options)
      } else {
        console.info('[%d] No options provided', reqId)
      }

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
