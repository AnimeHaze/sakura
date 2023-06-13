// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload with contextIsolation enabled
import { ipc } from '../enums'
import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld(
  'api',
  {
    toggleDevtools: () => ipcRenderer.invoke(ipc.TOGGLE_DEVTOOLS),
    closeApp: () => ipcRenderer.invoke(ipc.APP_CLOSE),
    minimizeMaximizeApp: () => ipcRenderer.invoke(ipc.APP_MAXIMIZE_MINIMIZE),
    collapseApp: () => ipcRenderer.invoke(ipc.APP_COLLAPSE),
    preventSleep: () => ipcRenderer.invoke(ipc.PREVENT_SLEEP),
    isDev: () => process.env.NODE_ENV === 'development',
    inspectElement: (x, y) => ipcRenderer.invoke(ipc.INSPECT_ELEMENT, { x, y })
  }
)
