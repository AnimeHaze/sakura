import { ipc } from '@enums/index'
import { EventEmitter } from 'node:events'
import { ipcMain } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import debug from 'debug'
import { createNotifyWindow } from '../../windows'
const d = debug('notify')
d.enabled = true

export class Notify extends EventEmitter {
  constructor () {
    super()
    this._window = null
    this._windowClose = null
    this._notifies = new Map()

    ipcMain.handle(ipc.NOTIFY_INTERNAL, async (_, { id: notifyId, event, data }) => {
      this.emit(
        event,
        { notify: this._notifies.get(notifyId), data }
      )

      d(`notify emit custom event "${event}"`, notifyId, event)
    })

    ipcMain.handle(ipc.NOTIFY_AFTER_LEAVE, async (_, notifyId) => {
      this.emit(
        'leave',
        this._notifies.get(notifyId)
      )

      this._notifies.delete(notifyId)

      d('notify leave', notifyId)

      if (!this._notifies.size) {
        await this.destroy()
      }
    })

    ipcMain.handle(ipc.NOTIFY_CLOSED, async (_, notifyId) => {
      this.emit(
        'closed',
        this._notifies.get(notifyId)
      )

      d('notify closed', notifyId)
    })
  }

  /**
   *
   * @param {{
   closable: boolean,
   description?: string,
   duration?: number,
   keepAliveOnHover?: boolean,
   meta?: string
   }} notify
   * @return {Promise<{ id: string }>}
   */
  async sendNotify (notify) {
    await this._windowClose
    const notifyId = uuidv4()

    if (!this._window) {
      d('create notify window & init')
      this._window = await createNotifyWindow()
    }
    d('create notify', notifyId, notify)
    this._notifies.set(notifyId, notify)
    this._window.webContents.send(ipc.RECEIVE_NOTIFY, { id: notifyId, ...notify })

    return { id: notifyId }
  }

  async init () {
    d('init')
  }

  async dispose () {
    d('dispose')
    return await this.destroy(true)
  }

  async destroy (removeHandlers = false) {
    if (this._window) {
      d('start notify window destroy')
      this._windowClose = new Promise((resolve) => {
        this._window.on('close', resolve)
      })

      this._window = this._window.close()

      await this._windowClose

      d('window destroyed')
    }

    if (removeHandlers) ipcMain.removeHandler(ipc.NOTIFY_CLOSED)
    if (removeHandlers) ipcMain.removeHandler(ipc.NOTIFY_AFTER_LEAVE)
  }
}
