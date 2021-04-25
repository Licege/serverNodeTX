const service = require('./src/servers/service')
const authorization = require('./src/servers/authorization')

const mode = process.env.DEFAULT_EXECUTION_MODE || 'service'

const servers = {
  authorization,
  service
}

module.exports = servers[mode]();