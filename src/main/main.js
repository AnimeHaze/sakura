import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { createMainWindow } from './utils/windows'
import { preventDisplaySleep } from './utils/power-save-blocker'
import { ipc } from '../enums'
import { API } from './api'
import { Notify } from '../utils/notify'
// const { OperaProxy } = require('./utils/opera-proxy')
import { APIServer } from './utils/api-server'
import { OnlineChecker } from '../utils/online-checker'
import path from 'node:path'
import { getBaseURL, isOpenShellSecure } from '../utils'

let mainWindow = null

// Check startup and quit if it's a Squirrel startup event
if (require('electron-squirrel-startup')) {
  app.quit()
}

if (!import.meta.env.VITE_DISABLE_APP_INSTANCE_LOCK) {
  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    app.quit()
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
      }
    })
  }
}

// const proxyURL = new URL('http://127.0.0.1:8082')
//
// console.log('Renderer proxy', proxyURL.toString())

// app.commandLine.appendSwitch('ignore-certificate-errors')
// app.commandLine.appendSwitch('proxy-server', '127.0.0.1:8082')
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
const appName = app.getName()
const appVersion = app.getVersion()
const metaInfo = [
  process.platform,
  app.getLocaleCountryCode(),
  app.getPreferredSystemLanguages()
].join('; ')
const userAgent = `${appName}/${appVersion} (${metaInfo})`

const api = new API({
  userAgent
  /*, proxy: proxyURL */
})
const apiServer = new APIServer()

const onlineChecker = new OnlineChecker({ url: import.meta.env.VITE_WEBSOCKET_ECHO })
onlineChecker.startPolling()
const notify = new Notify()

notify.on('openRelease', (data) => console.log('openRelease', data))
notify.on('watchEpisode', (data) => console.log('watchEpisode', data))


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
  if (method === 'testNotify') return notify.sendNotify(options)

  const allowedMethods = new Set([
    'getLastReleases', 'getNews', 'searchReleases', 'getRelease', 'getRandomRelease',
    'getUserLists', 'createUserList', 'getSearchFilters'
  ])
  // eslint-disable-next-line security/detect-object-injection
  if (!allowedMethods.has(method) || api[method] === undefined) {
    throw TypeError('Unknown API method')
  }

  // eslint-disable-next-line security/detect-object-injection
  return api[method](options)
}

ipcMain.handle(ipc.TOGGLE_DEVTOOLS, handleToggleDevelopmentTools)
ipcMain.handle(ipc.INSPECT_ELEMENT, handleInspectElement)
ipcMain.handle(ipc.APP_CLOSE, async () => {
  await onlineChecker.stopPolling()
  await notify.destroy(true)
  app.quit()
})

ipcMain.handle(ipc.APP_MAXIMIZE_MINIMIZE, handleAppMaximizeMinimize)
ipcMain.handle(ipc.APP_COLLAPSE, () => BrowserWindow.getFocusedWindow().minimize())
ipcMain.handle(ipc.PREVENT_SLEEP, () => preventDisplaySleep())
ipcMain.handle(ipc.API, handleAPI)

ipcMain.handle(ipc.MEMORY_USAGE, () => {
  return process.memoryUsage()
})

ipcMain.handle(ipc.CHECK_ONLINE, () => {
  return onlineChecker.onLine
})

app.on('web-contents-created', async (event, webContents) => {
  // const port = await proxyPromise
  //
  // webContents.session
  //   .setProxy({ proxyRules: 'http://localhost:' + port })

  const allowedList = [
    // eslint-disable-next-line no-undef
    path.join('file://', __dirname, `../renderer/${NOTIFY_WINDOW_VITE_NAME}/notify-index.html`),
    // eslint-disable-next-line no-undef
    path.join('file://', __dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
  ]

  const allowListDev = [
    // eslint-disable-next-line no-undef
    MAIN_WINDOW_VITE_DEV_SERVER_URL,
    // eslint-disable-next-line no-undef
    NOTIFY_WINDOW_VITE_DEV_SERVER_URL
  ]

  // eng-disable LIMIT_NAVIGATION_JS_CHECK
  webContents.on('will-navigate', (event, url) => {
    if (!isOpenShellSecure(url)) {
      event.preventDefault()
      return
    }

    // eslint-disable-next-line no-undef
    if (!allowedList.includes(url) && !allowListDev.includes(getBaseURL(url))) {
      event.preventDefault()

      shell.openExternal(url) // eng-disable OPEN_EXTERNAL_JS_CHECK
    }
  })

  // eng-disable LIMIT_NAVIGATION_JS_CHECK
  webContents.setWindowOpenHandler(({ url }) => { /* eng-disable LIMIT_NAVIGATION_JS_CHECK */
    if (!isOpenShellSecure(url)) return { action: 'deny' }

    // eslint-disable-next-line no-undef
    if (allowedList.includes(url) && allowListDev.includes(getBaseURL(url))) {
      return { action: 'allow' }
    }

    shell.openExternal(url) // eng-disable OPEN_EXTERNAL_JS_CHECK
    return { action: 'deny' }
  })

  // Prevent auxclick
  // eng-disable LIMIT_NAVIGATION_JS_CHECK
  webContents.on('new-window', e => { /* eng-disable LIMIT_NAVIGATION_JS_CHECK */
    e.preventDefault()
  })
})

app.on('ready', async () => {
  await apiServer.start()
  mainWindow = createMainWindow()
})

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    await onlineChecker.stopPolling()
    await notify.destroy(true)
    app.quit()
  }
})
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && (mainWindow = createMainWindow()))
