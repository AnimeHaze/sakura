const { app, BrowserWindow, ipcMain, shell } = require('electron')
const { createMainWindow } = require('./utils/windows')
const { preventDisplaySleep } = require('./utils/powerSaveBlocker')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

ipcMain.handle('toggle:devtools', () => BrowserWindow.getFocusedWindow().webContents.toggleDevTools())
ipcMain.handle('app:close', () => app.quit())
ipcMain.handle('app:maximize-minimize', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win.isMaximized()) {
    win.unmaximize()
  } else win.maximize()
})
ipcMain.handle('app:collapse', () => BrowserWindow.getFocusedWindow().minimize())

ipcMain.handle('app:prevent-sleep', () => preventDisplaySleep())

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
