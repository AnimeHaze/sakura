import { BrowserWindow } from 'electron'
import windowStateKeeper from 'electron-window-state'

export function createMainWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 680
  })

  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 860,
    minHeight: 516,
    width: mainWindowState.width,
    height: mainWindowState.height,
    // frame: false,
    show: false,
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    autoHideMenuBar: true
  })

  mainWindowState.manage(mainWindow)

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.webContents.once('ready-to-show', () => {
    mainWindow.show()
  })

  return mainWindow
}
