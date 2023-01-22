/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './style/index.css'

// import Vue from '../node_modules/vue/dist/vue.esm.browser.min.js';
//
// new Vue({
//   el: '#app',
//   data: {
//     message: '111'
//   }
// });

import devtools from '@vue/devtools'

import { createApp } from 'vue'
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

app.use(naive)
app.use(pinia)
app.use(router)

app.mount('#app')
devtools.connect()
