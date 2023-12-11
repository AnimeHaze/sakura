import { ipc } from '@enums/index'
import { ipcRenderer, contextBridge } from 'electron'

window.addEventListener('error', error => {
  if (error.message.includes('ResizeObserver')) {
    setTimeout(() => {
      document.querySelector('#webpack-dev-server-client-overlay-div')?.remove()
    }, 0)
    console.warn(error.message)
  }
})

const invokeIpcRenderer = (command, ...arguments_) => ipcRenderer.invoke(command, ...arguments_)
const sendIpcRenderer = (command, ...arguments_) => ipcRenderer.send(command, ...arguments_)

const api = {
  toggleDevtools: () => invokeIpcRenderer(ipc.TOGGLE_DEVTOOLS),
  closeApp: () => invokeIpcRenderer(ipc.APP_CLOSE),
  minimizeMaximizeApp: () => invokeIpcRenderer(ipc.APP_MAXIMIZE_MINIMIZE),
  collapseApp: () => invokeIpcRenderer(ipc.APP_COLLAPSE),
  preventSleep: () => invokeIpcRenderer(ipc.PREVENT_SLEEP),
  isDev: () => process.env.NODE_ENV === 'development',
  inspectElement: (x, y) => invokeIpcRenderer(ipc.INSPECT_ELEMENT, { x, y }),
  memoryUsage: () => invokeIpcRenderer(ipc.MEMORY_USAGE),
  callApi: (method, options) => invokeIpcRenderer(ipc.API, method, options),
  checkOnline: () => invokeIpcRenderer(ipc.CHECK_ONLINE),
  getCacheSize: () => invokeIpcRenderer(ipc.CACHE_SIZE),
  clearCache: () => invokeIpcRenderer(ipc.CLEAR_CACHE),
  moveWindow: (startX, startY) => sendIpcRenderer(ipc.MOVE_MAIN_WINDOW, { startX, startY })
}

contextBridge.exposeInMainWorld(
  '_api',
  api
)
