import { BrowserWindow } from 'electron'

export function createMainWindow () {
  const mainWindow = new BrowserWindow({
    minWidth: 860,
    minHeight: 516,
    width: 1200,
    height: 680,
    // frame: false,
    show: false,
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    autoHideMenuBar: true
  })

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show()
  })

  return mainWindow
}
