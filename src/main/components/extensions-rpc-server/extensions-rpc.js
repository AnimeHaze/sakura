import { spawn } from 'node:child_process'
import { EventEmitter } from 'node:events'
import { randomUUID } from 'node:crypto'
import { createInterface } from 'node:readline/promises'
import { Encoder, Decoder } from '@msgpack/msgpack'
import debug from 'debug'
import * as path from 'node:path'

/** @type {BufferEncoding} */
const MESSAGE_FORMAT = 'binary'
const EOL = '\n'
const ID_LENGTH = 36
const TYPE_LENGTH = 1

const PING_ID = '00000000-0000-0000-0000-000000000000'
const SUBSCRIPTION_PREFIX = '$'
const CALL_PREFIX = '#'

class DeserializeError extends Error {}
class TimeoutError extends Error {}
class AbortError extends Error {}

const __dirname = decodeURI(path.dirname(new URL(import.meta.url).pathname))

const encoder = new Encoder()
const decoder = new Decoder()

class APIContext {
  constructor (output, id, data, options) {
    this.data = data
    this.output = output
    this.id = id
    this.options = options
    this.name = options.name
  }

  answer (data) {
    debug(`extensions:${this.name}:api-answer`)(this.id, data)

    return this.output.write(
      this.id +
          CALL_PREFIX +
          Buffer.from(
            encoder.encode(data)
          ).toString(this.options.messageFormat) +
          EOL
    )
  }
}

/**
 * @typedef {object} ExtensionServerSettings
 * @property {NodeJS.ReadableStream} [input] Input
 * @property {NodeJS.WritableStream} [output] Output
 * @property {string} name Extension name
 * @property {number} [restartInterval=5000] Restart interval
 * @property {'binary' |'base64' | 'hex'} [messageFormat=binary] Message format
 */
export class SakuraExtensionRPCServer extends EventEmitter {
  /**
     *
     * @param {ExtensionServerSettings} params
     */
  constructor (params) {
    super()

    const { input, output, name, messageFormat, entrypoint, restartInterval } = params

    if (!name) {
      throw new Error('Extension name is required')
    }

    this.restartInterval = restartInterval ?? 5000
    this.lastHeartBeat = Date.now()
    this.healthly = null

    this.d = debug('extensions:common')

    this.entrypoint = entrypoint
    this.name = name
    this.messageFormat = messageFormat ?? MESSAGE_FORMAT
    this.altInput = input
    this.altOutput = output
  }

  restart () {
    this.client.stdout.removeAllListeners()
    this.client.stderr.removeAllListeners()
    this.client.stdin.removeAllListeners()
    this.client.removeAllListeners()

    setTimeout(() => {
      this.start()
    }, this.restartInterval)
  }

  start () {
    this.client = spawn('node', [this.entrypoint])

    this.input = this.altInput ?? this.client.stdout
    this.output = this.altOutput ?? this.client.stdin

    this.rl = createInterface({
      input: this.input
    })

    // add remove listener on destruct
    this.client.stdout.on('data', (data) => {
      debug(`extension:${this.name}:stdout`)(data.toString())
    })

    this.client.stderr.on('data', (data) => {
      debug(`extension:${this.name}:stderr`)(data.toString())
    })

    this.client.on('spawn', () => {
      debug(`extension:${this.name}:spawn`)('spawned')
      this.rl.on('line', line => this.handler(line))
      this.startHeartBeat()
    })

    this.client.on('exit', code => {
      debug(`extension:${this.name}:exit`)('code', code)

      debug(`extension:${this.name}`)('restarting...')
      this.restart()
    })
  }

  startHeartBeat () {
    this.heartBeatId = setInterval(() => {
      if (Date.now() - this.lastHeartBeat > 5000) {
        if (this.healthly || this.healthly === null) {
          this.healthly = false
          this.emit('healthy', false)
          debug(`extensions:${this.name}:health`)('extension is unhealthy')
        }
      } else if (this.healthly === false || this.healthly === null) {
        this.healthly = true
        this.emit('healthy', true)
        debug(`extensions:${this.name}:health`)('extension is healthy')
      }
    }, 1000)
  }

  stopHeartBeat () {
    clearInterval(this.heartBeatId)
  }

  static generateId () {
    return randomUUID()
  }

  handler (line) {
    const type = line.slice(ID_LENGTH, ID_LENGTH + TYPE_LENGTH)
    const lineRequestId = line.slice(0, ID_LENGTH)
    const event = line.slice(ID_LENGTH + TYPE_LENGTH)

    if (lineRequestId === PING_ID) {
      this.d('received ping from extension')
      this.lastHeartBeat = Date.now()
      return
    }

    if (type === CALL_PREFIX) {
      const eventData = decoder.decode(Buffer.from(event, this.messageFormat))

      const eventParams = eventData.params

      debug(`extensions:${this.name}:api-call:${eventData.method}`)(lineRequestId, eventParams.params)
      const context = new APIContext(
        this.output,
        lineRequestId,
        eventParams.params,
        {
          messageFormat: this.messageFormat,
          name: this.name
        }
      )
      this.emit(`call:${eventData.method}`, context)
    } else if (type === SUBSCRIPTION_PREFIX) {

    }
  }

  dispatchEvent (event, data) {
    this.output.write(
      SakuraExtensionServer.generateId() +
            SUBSCRIPTION_PREFIX +
            encoder.encode({ type: event, data }) +
            EOL
    )
  }

  close () {
    this.stopHeartBeat()
    this.rl.close()
  }
}

// const sakura = new SakuraExtensionServer({
//   entrypoint: path.join(__dirname, 'client.js'),
//   name: 'Shikimori'
// })
//
// sakura.start()
//
// sakura.on('call:hello', (data) => {
//   data.answer({ xui: 0 })
//   // sakura.dispatchEvent('request', { xui: Math.random() })
//   // console.log('[call:hello]', data);
// })
//
// sakura.on('healthy', (data) => {
//   // console.log('healthy', data);
// })
