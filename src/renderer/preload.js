import { ipc } from '../enums'
import { ipcRenderer, contextBridge } from 'electron'

const invokeIpcRenderer = (command, ...args) => ipcRenderer.invoke(command, ...args)

contextBridge.exposeInMainWorld(
  'api',
  {
    toggleDevtools: () => invokeIpcRenderer(ipc.TOGGLE_DEVTOOLS),
    closeApp: () => invokeIpcRenderer(ipc.APP_CLOSE),
    minimizeMaximizeApp: () => invokeIpcRenderer(ipc.APP_MAXIMIZE_MINIMIZE),
    collapseApp: () => invokeIpcRenderer(ipc.APP_COLLAPSE),
    preventSleep: () => invokeIpcRenderer(ipc.PREVENT_SLEEP),
    isDev: () => process.env.NODE_ENV === 'development',
    inspectElement: (x, y) => invokeIpcRenderer(ipc.INSPECT_ELEMENT, { x, y }),
    callApi: (method, options) => invokeIpcRenderer(ipc.API, method, options)
  }
)
