const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { createMainWindow } = require('./utils/windows')
const { preventDisplaySleep } = require('./utils/power-save-blocker')
const { ipc } = require('../enums')
const { API } = require('./api')

const api = new API()

const handleToggleDevTools = () => {
  const { webContents } = BrowserWindow.getFocusedWindow()

  if (webContents.isDevToolsOpened()) {
    webContents.devToolsWebContents.focus()
  } else webContents.toggleDevTools()
}

const handleInspectElement = (_, { x, y }) => {
  const { webContents } = BrowserWindow.getFocusedWindow()
  webContents.inspectElement(x, y)
  if (webContents.isDevToolsOpened()) {
    webContents.devToolsWebContents.focus()
  }
}

const handleAppMaximizeMinimize = () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else win.maximize()
}

const handleAPI = (event, method, options) => {
  const allowedMethods = new Set(['getLastReleases', 'getNews', 'searchReleases', 'getRelease'])
  if (!allowedMethods.has(method) || api[method] === undefined) {
    throw TypeError('Unknown API method')
  }

  return api[method](options)
}

// Check startup and quit if it's a Squirrel startup event
if (require('electron-squirrel-startup')) {
  app.quit()
}

ipcMain.handle(ipc.TOGGLE_DEVTOOLS, handleToggleDevTools)
ipcMain.handle(ipc.INSPECT_ELEMENT, handleInspectElement)
ipcMain.handle(ipc.APP_CLOSE, () => app.quit())
ipcMain.handle(ipc.APP_MAXIMIZE_MINIMIZE, handleAppMaximizeMinimize)
ipcMain.handle(ipc.APP_COLLAPSE, () => BrowserWindow.getFocusedWindow().minimize())
ipcMain.handle(ipc.PREVENT_SLEEP, () => preventDisplaySleep())
ipcMain.handle(ipc.API, handleAPI)

app.on('web-contents-created', (event, webContents) => {
  webContents.on('will-navigate', (event, url) => {
    // eslint-disable-next-line no-undef
    if (!url.startsWith(MAIN_WINDOW_WEBPACK_ENTRY)) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  webContents.setWindowOpenHandler(({ url }) => {
    // eslint-disable-next-line no-undef
    if (url.startsWith(MAIN_WINDOW_WEBPACK_ENTRY)) {
      return { action: 'allow' }
    }

    shell.openExternal(url)
    return { action: 'deny' }
  })
})

app.on('ready', () => createMainWindow())
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createMainWindow())
