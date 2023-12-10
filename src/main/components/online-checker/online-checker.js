import ReconnectingWebSocket from 'reconnecting-websocket'
import WS from 'ws'
import debug from 'debug'
import { onlineChecker } from '@enums/index.js'
const d = debug('online-checker')

export class OnlineChecker {
  constructor ({ onlineWs }) {
    this._socket = new ReconnectingWebSocket(onlineWs, [], {
      WebSocket: WS,
      connectionTimeout: 1000,
      maxReconnectionDelay: 4000,
      maxRetries: Infinity,
      debug: true,
      timeoutInterval: 3000,
      startClosed: true
    })

    // Patch debug logger
    this._socket._debug = function () {
      d(...arguments)
    }

    d.enabled = true

    this._socket.reconnect()

    this._timeout = null
    this._lastOnLine = Date.now()
  }

  async init () {
    this._socket.addEventListener('open', () => {
      this._timeout = setInterval(() => this._socket.send(onlineChecker.PING), 1000)
    })

    this._socket.addEventListener('message', (message) => {
      const lastOnLine = this.onLine
      if (message.data.toString() === 'p') this._lastOnLine = Date.now()
      if (lastOnLine !== this.onLine) console.log('onLine status changed:', this.onLine)
    })
  }

  get onLine () {
    return (Date.now() - this._lastOnLine) < 2000
  }

  async dispose () {
    const waitForClose = new Promise((resolve) => {
      this._socket.addEventListener('close', () => {
        resolve()

        setTimeout(resolve, 3000)
      })
    })

    clearTimeout(this._timeout)
    this._socket.close()

    await waitForClose
  }
}
