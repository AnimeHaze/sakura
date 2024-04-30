import { app, BrowserWindow, ipcMain, shell, screen } from 'electron'
import path from 'node:path'
import { getBaseURL, isOpenShellSecure, nFormatter } from '../../../utils'
import { createMainWindow } from '../../windows'
import { ipc } from '@enums/index'
import debug from 'debug'
const d = debug('app')
d.enabled = true

export class App {
  /**
   * @param {WindowsManager} windowsManager
   * @param {OnlineChecker} onlineCheckerService
   * @param {API} apiService
   * @param {Notify} notifyService
   * @param {PowerSaveBlocker} powerSaveBlocker
   * @param {boolean} instanceLockEnabled
   */
  constructor ({
    windowsManager,
    onlineCheckerService,
    apiService,
    notifyService,
    powerSaveBlocker,
    instanceLockEnabled
  }) {
    this._powerSaveBlocker = powerSaveBlocker
    this._windowsManager = windowsManager
    this._onlineCheckerService = onlineCheckerService
    this._apiService = apiService
    this._notifyService = notifyService

    this._notifyService.on('openRelease', (data) => console.log('openRelease', data))
    this._notifyService.on('watchEpisode', (data) => console.log('watchEpisode', data))

    if (instanceLockEnabled) {
      const gotTheLock = app.requestSingleInstanceLock()

      if (!gotTheLock) {
        app.quit()
      } else {
        app.on('second-instance', (event, commandLine, workingDirectory, additionalData) => {
          const mainWindow = this._windowsManager.getWindow('main')

          if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
          }
        })
      }
    }

    app.commandLine.appendSwitch('lang', 'en-US')
    app.on(
      'web-contents-created',
      (event, webContents) =>
        this.webContentsCreated(event, webContents)
    )
    app.on('ready', () => this.ready())
    app.on('window-all-closed', () => this.windowAllClosed())
    app.on('activate', () => this.activate())

    ipcMain.on(ipc.MOVE_MAIN_WINDOW, (event, ...args) => this.handleMainWindowMove(event, ...args))
    ipcMain.handle(ipc.TOGGLE_DEVTOOLS, () => this.handleToggleDevelopmentTools())
    ipcMain.handle(ipc.INSPECT_ELEMENT, (_, data) => this.handleInspectElement(_, data))
    ipcMain.handle(ipc.MEMORY_USAGE, () => this.handleMemoryUsage())
    ipcMain.handle(ipc.CHECK_ONLINE, () => this.handleOnlineCheck())
    ipcMain.handle(ipc.APP_MAXIMIZE_MINIMIZE, () => this.handleAppMaximizeMinimize())
    ipcMain.handle(ipc.APP_CLOSE, () => this.handleAppClose())
    ipcMain.handle(ipc.API, (event, method, options) => this.handleAPI(event, method, options))
    ipcMain.handle(ipc.APP_COLLAPSE, () => this.handleAppCollapse())
    ipcMain.handle(ipc.PREVENT_SLEEP, () => this._powerSaveBlocker.preventDisplaySleep())
    ipcMain.handle(ipc.CACHE_SIZE, () => this.handleGetCacheSize())
    ipcMain.handle(ipc.CLEAR_CACHE, () => this.handleClearCache())
  }

  async init () {
    d('init')
  }

  async dispose () {
    d('dispose')
  }

  activate () {
    if (BrowserWindow.getAllWindows().length === 0) {
      this._windowsManager.addWindow(
        'main',
        createMainWindow()
      )
    }
  }

  ready () {
    // await apiServer.start()
    this._windowsManager.addWindow(
      'main',
      createMainWindow()
    )
  }

  async windowAllClosed () {
    if (process.platform !== 'darwin') {
      // await onlineChecker.stopPolling()
      await this._notifyService.destroy(true)
      app.quit()
    }
  }

  /**
   * @param {IpcMainEvent} event
   * @param {WebContents} webContents
   */
  webContentsCreated (event, webContents) {
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
  }

  handleAppCollapse () {
    /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    if (mainWindow) {
      mainWindow.minimize()
    }
  }

  handleToggleDevelopmentTools () {
    const { webContents } = BrowserWindow.getFocusedWindow()

    if (webContents.isDevToolsOpened()) {
      webContents.devToolsWebContents.focus()
    } else webContents.toggleDevTools()
  }

  handleInspectElement (_, { x, y }) {
    /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    if (mainWindow) {
      const { webContents } = mainWindow
      webContents.inspectElement(x, y)
      if (webContents.isDevToolsOpened()) {
        webContents.devToolsWebContents.focus()
      }
    }
  }

  async handleGetCacheSize () {
    /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    const data = { size: 0, formatted: 0 }

    if (mainWindow) {
      const bytes = await mainWindow.webContents.session.getCacheSize()
      data.size = bytes
      data.formatted = nFormatter(bytes, 1024)
    }

    return data
  }

  async handleClearCache () {
    /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    if (mainWindow) {
      await Promise.all([
        mainWindow.webContents.session.clearCache(),
        mainWindow.webContents.session.clearStorageData(),
        mainWindow.webContents.session.clearCodeCaches({})
      ])
      return true
    }

    return false
  }

  async handleMemoryUsage () {
    return process.memoryUsage()
  }

  handleOnlineCheck () {
    return this._onlineCheckerService.onLine
  }

  handleAppMaximizeMinimize () {
    /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
      } else mainWindow.maximize()
    }
  }

  handleAppClose () {
    // await onlineChecker.stopPolling()
    app.quit()
  }

  /**
   * @param {IpcMainEvent} event
   * @param {string} method
   * @param {object} options
   * @return {Promise}
   */
  handleAPI (event, method, options) {
    if (method === 'testNotify') return this._notifyService.sendNotify(options)

    const allowedMethods = new Set([
      'getLastReleases', 'getNews', 'searchReleases', 'getRelease', 'getRandomRelease',
      'getUserLists', 'createUserList', 'getSearchFilters'
    ])

    if (!allowedMethods.has(method) || this._apiService[method] === undefined) {
      throw TypeError('Unknown API method')
    }

    return this._apiService[method](options)
  }

  /**
   * @param {IpcMainEvent} _
   * @param {number} startX
   * @param {number} startY
   */
  handleMainWindowMove (_, { startX, startY }) {
  /** @type {BrowserWindow} */
    const mainWindow = this._windowsManager.getWindow('main')

    if (mainWindow) {
      const { x, y } = screen.getCursorScreenPoint()
      mainWindow.setPosition(x - startX, y - startY)
    }
  }
}
