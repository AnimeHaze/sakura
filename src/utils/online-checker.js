import WS from 'ws'

export class OnlineChecker {
  constructor (options) {
    const socket = new WS(options.url)

    socket.debug = true
    socket.timeoutInterval = 3000

    this._socket = socket
    this._timeout = null
    this._lastOnLine = Date.now()
  }

  startPolling () {
    this._socket.addEventListener('open', () => {
      this._timeout = setInterval(() => this._socket.send('ping'), 500)
    })

    this._socket.addEventListener('message', (message) => {
      const lastOnLine = this.onLine
      if (message.data.toString() === 'ping') this._lastOnLine = Date.now()
      if (lastOnLine !== this.onLine) console.log('onLine status changed:', this.onLine)
    })
  }

  get onLine () {
    return (Date.now() - this._lastOnLine) < 2000
  }

  stopPolling () {
    this._socket.close()
    clearTimeout(this._timeout)
  }
}
