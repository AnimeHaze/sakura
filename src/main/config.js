import debug from 'debug'
import * as fs from 'node:fs/promises'
import path from 'node:path'
import { EventEmitter } from 'node:events'

const d = debug('config')
d.enabled = true

export class Config extends EventEmitter {
  constructor ({ configPath }) {
    super()

    this._writePromise = null
    this.config = new Map()
    this.configPath = path.join(configPath, 'config.json')

    d('use config path: %s', this.configPath)
  }

  async init () {
    await this.load()
    d('init')
  }

  async dispose () {
    d('dispose')

    if (this._writePromise) {
      d('waiting for write promise')
      await this._writePromise
    }
  }

  async save () {
    this._writePromise = await fs.writeFile(
      this.configPath,
      JSON.stringify(
        await this.getAll(),
        null,
        2
      )
    )
  }

  async load () {
    const configExists = await fs.access(this.configPath).then(() => true, () => false)

    if (!configExists) {
      await this.save()
      d('config created')
    }

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const data = await fs.readFile(
      this.configPath,
      'utf8'
    )

    try {
      Object.entries(
        JSON.parse(data)
      ).forEach(([key, value]) => {
        this.config.set(key, value)
      })
    } catch (e) {
      d('invalid config', e)

      await this.save()
      await this.load()
    }
  }

  async getAll () {
    return Object.fromEntries(
      this.config.entries()
    )
  }

  async get (prop) {
    return this.config.get(prop)
  }

  async delete (prop) {
    this.config.delete(prop)
    await this.save()

    return true
  }

  async set (prop, value) {
    this.config.set(prop, value)
    await this.save()

    return true
  }
}
