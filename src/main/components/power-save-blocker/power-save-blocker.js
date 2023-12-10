const { powerSaveBlocker } = require('electron')
const d = require('debug')('prevent-sleep')

export class PowerSaveBlocker {
  constructor () {
    this._intervalMs = 10000
    this._currentSeepBlockerId = null
    this._timeoutId = null
  }

  async init () {
    d('init')
  }

  async dispose () {
    d('dispose')
  }

  stopPlanning () {
    return setTimeout(() => {
      if (powerSaveBlocker.isStarted(this._currentSeepBlockerId)) {
        powerSaveBlocker.stop(this._currentSeepBlockerId)
        d(`[${this._currentSeepBlockerId}] stop`)
        this._currentSeepBlockerId = null
        this._timeoutId = null
      }
    }, this._intervalMs)
  }

  preventDisplaySleep () {
    if (this._currentSeepBlockerId !== null) {
      d(`[${this._currentSeepBlockerId}] clear & restart timeout`)
      clearTimeout(this._timeoutId)
      this._timeoutId = this.stopPlanning(this._intervalMs)
      return true
    } else {
      this._currentSeepBlockerId = powerSaveBlocker.start('prevent-display-sleep')
      this._timeoutId = this.stopPlanning(this._intervalMs)
      d(`[${this._currentSeepBlockerId}] create blocker, create timeout`)
      return true
    }
  }
}
