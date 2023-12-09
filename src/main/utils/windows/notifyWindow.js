import { BrowserWindow, ipcMain, screen } from 'electron'
import path from 'node:path'
import { pointInRect } from '../../../utils'
import { ipc } from '@enums/index'

export function createNotifyWindow () {
  let resolveWindow = () => {}
  const windowPromise = new Promise((resolve) => (resolveWindow = resolve))

  const monitor = screen.getPrimaryDisplay()
  const { bounds: { x, y }, workArea } = monitor
  const windowWidth = 500
  const windowHeight = workArea.height
  const windowX = x + workArea.width - windowWidth

  const notifyWindow = new BrowserWindow({
    show: false,
    x: windowX,
    y,
    width: windowWidth,
    maxWidth: windowWidth,
    minWidth: windowWidth,
    height: workArea.height,
    maxHeight: windowHeight,
    minHeight: windowHeight,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    resizable: false,
    /*
     Works only in windows and must be `true` because false prevents window closing (programmatically too),
     by default true. Only for note and preventing future problems
     */
    closable: true,
    movable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    maximizable: false,
    minimizable: false,
    focusable: false, // Remove from taskbar Linux
    skipTaskbar: false, // Remove from taskbar window / darwin
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      preload: path.join(__dirname, '../build/preload-notify.js')
    }
  })

  notifyWindow.on('close', () => {
    ipcMain.removeHandler(ipc.SET_NOTIFY_SHAPE)
    ipcMain.removeHandler(ipc.NOTIFY_READY)
  })

  notifyWindow.on('hide', () => {
    // forward must be `false` because windows has
    // video artifacts when mowing other windows of App over notify window
    notifyWindow.setIgnoreMouseEvents(true)
  })

  notifyWindow.on('show', () => {
    // forward must be `false` because windows has
    // video artifacts when mowing other windows of App over notify window
    notifyWindow.setIgnoreMouseEvents(true)
  })

  /**
   *
   * @param _
   * @param {Array<{x: number, y: number, width: number, height: number}>} rects
   */
  function setShape (_, rects) {
    const { x: xMouse, y: yMouse } = screen.getCursorScreenPoint()

    const ignore = rects.some(({ x: xRect, y: yRect, width, height }) => pointInRect(
      windowX + xRect, yRect + y,
      width, height,
      xMouse, yMouse
    ))

    if (ignore) {
      notifyWindow.setIgnoreMouseEvents(false)
    } else {
      // forward must be `false` because windows has
      // video artifacts when mowing other windows of App over notify window
      notifyWindow.setIgnoreMouseEvents(true)
    }
  }

  ipcMain.handle(ipc.SET_NOTIFY_SHAPE, setShape)
  ipcMain.handle(ipc.NOTIFY_READY, () => resolveWindow(notifyWindow))

  notifyWindow.removeMenu()
  notifyWindow.webContents.once('ready-to-show', () => {
    notifyWindow.show()
  })

  notifyWindow.webContents.openDevTools({ mode: 'detach' })

  // eslint-disable-next-line no-undef
  if (NOTIFY_WINDOW_VITE_DEV_SERVER_URL) {
    // eslint-disable-next-line no-undef
    notifyWindow.loadURL(`${NOTIFY_WINDOW_VITE_DEV_SERVER_URL}/notify-index.html`)
  } else {
    // eslint-disable-next-line no-undef
    notifyWindow.loadFile(path.join(__dirname, `../renderer/${NOTIFY_WINDOW_VITE_NAME}/notify-index.html`))
  }

  return windowPromise
}
