// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload with contextIsolation enabled
const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  'api',
  {
    toggleDevtools: () => ipcRenderer.invoke('toggle:devtools'),
    closeApp: () => ipcRenderer.invoke('app:close'),
    minimizeMaximizeApp: () => ipcRenderer.invoke('app:maximize-minimize'),
    collapseApp: () => ipcRenderer.invoke('app:collapse')
  }
)
