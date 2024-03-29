const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { createMainWindow } = require('./utils/windows')
const { preventDisplaySleep } = require('./utils/power-save-blocker')
const { ipc } = require('../enums')
const { API } = require('./api')
const { OperaProxy } = require('./utils/opera-proxy')
const { APIServer } = require('./utils/api-server')
const path = require('node:path')

const api = new API()
const apiServer = new APIServer()

const op = new OperaProxy(path.resolve('./src/opera-proxy'))

const proxyPromise = op.start()

const handleToggleDevelopmentTools = () => {
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
  // eslint-disable-next-line security/detect-object-injection
  if (!allowedMethods.has(method) || api[method] === undefined) {
    throw TypeError('Unknown API method')
  }

  // eslint-disable-next-line security/detect-object-injection
  return api[method](options)
}

// Check startup and quit if it's a Squirrel startup event
if (require('electron-squirrel-startup')) {
  app.quit()
}

ipcMain.handle(ipc.TOGGLE_DEVTOOLS, handleToggleDevelopmentTools)
ipcMain.handle(ipc.INSPECT_ELEMENT, handleInspectElement)
ipcMain.handle(ipc.APP_CLOSE, () => app.quit())
ipcMain.handle(ipc.APP_MAXIMIZE_MINIMIZE, handleAppMaximizeMinimize)
ipcMain.handle(ipc.APP_COLLAPSE, () => BrowserWindow.getFocusedWindow().minimize())
ipcMain.handle(ipc.PREVENT_SLEEP, () => preventDisplaySleep())
ipcMain.handle(ipc.API, handleAPI)

ipcMain.handle(ipc.MEMORY_USAGE, () => {
  return process.memoryUsage()
})

app.on('web-contents-created', async (event, webContents) => {
  const port = await proxyPromise

  webContents.session
    .setProxy({ proxyRules: 'http://localhost:' + port })

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

app.on('ready', async () => {
  await apiServer.start()
  return createMainWindow()
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createMainWindow())
