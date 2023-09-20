const fastify = require('fastify')({
  logger: true
})
const cors = require('@fastify/cors')

const portfinder = require('portfinder')

fastify.get('/chapters', function handler () {
  return {
    cues: [
      { startTime: 0, endTime: 93, text: 'Начало' },
      { startTime: 93, endTime: 183, text: 'Opening' },
      { startTime: 183, endTime: 1420, text: 'Аниме' }
    ]
  }
})

class APIServer {
  constructor (bin, ip = '127.0.0.1', port) {
    this.ip = ip
    this.port = port
  }

  async start () {
    const bindPort = this.port ?? await portfinder.getPortPromise()
    await fastify.register(cors)
    await fastify.listen({ port: bindPort, host: this.ip })
  }
}

module.exports = { APIServer }
