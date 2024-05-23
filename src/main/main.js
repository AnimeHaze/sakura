// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { app } from 'electron'
import { AwilixManager } from 'awilix-manager'
import { InjectionMode, Lifetime, asClass, createContainer, asValue } from 'awilix'
import { API } from './components/api'
import { OnlineChecker } from './components/online-checker'
import { WindowsManager } from './components/windows-manager'
import { App } from './components/app'
import { Notify } from './components/notify'
import { PowerSaveBlocker } from './components/power-save-blocker'
import { Torrent } from './components/webtorrent'
import { Config } from './config'

// Check startup and quit if it's a Squirrel startup event
if (require('electron-squirrel-startup')) {
  app.quit()
}

const appName = app.getName()
const appVersion = app.getVersion()
const metaInfo = [
  process.platform,
  app.getLocaleCountryCode(),
  app.getPreferredSystemLanguages()
].join('; ')

const diContainer = createContainer({
  injectionMode: InjectionMode.PROXY
})

diContainer.register({
  userAgent: asValue(`${appName}/${appVersion} (${metaInfo})`),
  proxy: asValue(/*{ uri: 'http://127.0.0.1:8080', rejectUnauthorized: false}*/null),
  configPath: asValue(app.getPath('userData')),
  onlineWs: asValue(import.meta.env.VITE_WEBSOCKET_ECHO),
  instanceLockEnabled: asValue(!import.meta.env.VITE_DISABLE_APP_INSTANCE_LOCK),
  config: asClass(Config, {
    lifetime: Lifetime.SINGLETON,
    asyncInit: 'init',
    asyncDispose: 'dispose'
  }),
  apiService: asClass(API, {
    lifetime: Lifetime.SINGLETON,
    asyncInit: 'init',
    asyncDispose: 'dispose'
  }),
  onlineCheckerService: asClass(OnlineChecker, {
    lifetime: Lifetime.SINGLETON,
    asyncInit: 'init',
    asyncDispose: 'dispose'
  }),
  powerSaveBlocker: asClass(PowerSaveBlocker, {
    lifetime: Lifetime.SINGLETON,
    asyncInit: 'init',
    asyncDispose: 'dispose'
  }),
  notifyService: asClass(Notify, {
    lifetime: Lifetime.SINGLETON,
    asyncDispose: 'dispose',
    asyncInit: 'init'
  }),
  windowsManager: asClass(WindowsManager, {
    lifetime: Lifetime.SINGLETON,
    asyncDispose: 'dispose',
    asyncInit: 'init'
  }),
  app: asClass(App, {
    lifetime: Lifetime.SINGLETON,
    asyncInitPriority: 2,
    asyncDispose: 'dispose',
    asyncInit: 'init'
  }),
  torrent: asClass(Torrent, {
    lifetime: Lifetime.SINGLETON,
    asyncInit: 'init',
    asyncDispose: 'dispose'
  })
})

const awilixManager = new AwilixManager({
  diContainer,
  asyncInit: true,
  asyncDispose: true
})

async function main () {
  await awilixManager.executeInit()
}

main()
