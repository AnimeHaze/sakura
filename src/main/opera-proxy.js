const { spawn } = require('node:child_process')
const readline = require('node:readline')
const portfinder = require('portfinder')

export class OperaProxy {
  constructor (bin, ip = '127.0.0.1', port) {
    this.ip = ip
    this.port = port
    this.bin = bin
  }

  async start (country = 'EU') {
    const bindPort = this.port ?? await portfinder.getPortPromise()

    const operaProxy = spawn(this.bin, ['-country', 'EU', '-bind-address', `127.0.0.1:${bindPort}`])
    const rl = readline.createInterface({ input: operaProxy.stdout })
    console.log('proxy started', bindPort)
    rl.on('line', line => {
      console.log(line)
    })

    operaProxy.on('close', (code) => {
      console.log('proxy exit', code)
    })

    return bindPort
  }

  getAvailableCountries () {
    const countries = {}
    let isFirst = true // Ignore first line

    const operaProxy = spawn(this.bin, ['-list-countries'])
    const rl = readline.createInterface({ input: operaProxy.stdout })

    rl.on('line', line => {
      if (!isFirst) {
        const [code, name] = line.split(',')
        countries[code] = name
      } else isFirst = false
    })

    return new Promise((resolve, reject) => {
      operaProxy.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, result: countries })
        } else reject(new Error(`Can't get proxy countries. Code ${code}`))
      })
    })
  }
}
// const operaProxy = spawn(path.resolve('./src/opera-proxy'), [])
