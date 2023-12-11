import { BrowserWindow, nativeImage } from 'electron'
import windowStateKeeper from 'electron-window-state'
import path from 'node:path'

export function createMainWindow () {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 680
  })

  const logoPath = path.resolve(__dirname, 'assets', 'logo')
  const icons = {
    darwin: path.join(logoPath, 'logo.icns'),
    linux: path.join(logoPath, 'logo.png'),
    win32: path.join(logoPath, 'logo.ico')
  }

  const mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    minWidth: 860,
    minHeight: 516,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    transparent: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      // webSecurity: false,
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, '../build/preload.js')
    },
    icon: nativeImage.createFromPath(icons[process.platform]),
    autoHideMenuBar: true
  })

  mainWindowState.manage(mainWindow)

  // and load the index.html of the app.
  // eslint-disable-next-line no-undef
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    // eslint-disable-next-line no-undef
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    // eslint-disable-next-line no-undef
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  mainWindow.webContents.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  })

  return mainWindow
}
