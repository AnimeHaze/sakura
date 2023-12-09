import { ipc } from '@enums/index.js'
import { ipcRenderer, contextBridge } from 'electron'

let notifyHandler = null
const invokeIpcRenderer = (command, ...arguments_) => ipcRenderer.invoke(command, ...arguments_)

ipcRenderer.on(ipc.RECEIVE_NOTIFY, function (event, notify) {
  if (notifyHandler) notifyHandler(notify)
})

const api = {
  setShape: (rects) => invokeIpcRenderer(ipc.SET_NOTIFY_SHAPE, rects),
  ready: () => invokeIpcRenderer(ipc.NOTIFY_READY),
  setNotifyHandler: (fn) => (notifyHandler = fn),
  removeNotifyHandler: () => (notifyHandler = null),
  notifyClosed: (notifyId) => invokeIpcRenderer(ipc.NOTIFY_CLOSED, notifyId),
  notifyLeave: (notifyId) => invokeIpcRenderer(ipc.NOTIFY_AFTER_LEAVE, notifyId),
  notifyEvent: (id, event, data) => invokeIpcRenderer(ipc.NOTIFY_INTERNAL, { id, event, data })
}

contextBridge.exposeInMainWorld(
  'api',
  api
)
