const { powerSaveBlocker } = require('electron')
const d = require('debug')('app:prevent-sleep')

const intervalMs = 10000
let currentSeepBlockerId = null
let timeoutId = null

function stopPlanning (intervalMs) {
  return setTimeout(() => {
    if (powerSaveBlocker.isStarted(currentSeepBlockerId)) {
      powerSaveBlocker.stop(currentSeepBlockerId)
      d(`[${currentSeepBlockerId}] stop`)
      currentSeepBlockerId = null
      timeoutId = null
    }
  }, intervalMs)
}

function preventDisplaySleep () {
  if (currentSeepBlockerId !== null) {
    d(`[${currentSeepBlockerId}] clear & restart timeout`)
    clearTimeout(timeoutId)
    timeoutId = stopPlanning(intervalMs)
    return true
  } else {
    currentSeepBlockerId = powerSaveBlocker.start('prevent-display-sleep')
    timeoutId = stopPlanning(intervalMs)
    d(`[${currentSeepBlockerId}] create blocker, create timeout`)
    return true
  }
}

module.exports = { preventDisplaySleep }
