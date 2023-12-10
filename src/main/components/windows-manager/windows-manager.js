import debug from 'debug'
const d = debug('windows-manager')
d.enabled = true

export class WindowsManager {
  constructor () {
    this._windows = new Map()
  }

  async init () {
    d('init')
  }

  async dispose () {
    d('dispose')
  }

  addWindow (name, window) {
    this._windows.set(name, window)
  }

  getWindow (name) {
    return this._windows.get(name)
  }
}
