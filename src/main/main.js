const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { createMainWindow } = require('./utils/windows')
const { preventDisplaySleep } = require('./utils/powerSaveBlocker')
const { ipc } = require('../enums')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

ipcMain.handle(ipc.TOGGLE_DEVTOOLS, () => BrowserWindow.getFocusedWindow().webContents.toggleDevTools())
ipcMain.handle(ipc.APP_CLOSE, () => app.quit())
ipcMain.handle(ipc.APP_MAXIMIZE_MINIMIZE, () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else win.maximize()
})
ipcMain.handle(ipc.APP_COLLAPSE, () => BrowserWindow.getFocusedWindow().minimize())

ipcMain.handle(ipc.PREVENT_SLEEP, () => preventDisplaySleep())

app.on('web-contents-created', (event, webContents) => {
  webContents.on('will-navigate', (e, url) => {
    // eslint-disable-next-line no-undef
    if (!url.startsWith(MAIN_WINDOW_WEBPACK_ENTRY)) {
      e.preventDefault()
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
