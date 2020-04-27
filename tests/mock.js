const { createDebug } = require('../lib/index')

// @ts-ignore
const debug = createDebug(module, {
  prefix: 'app',
  rootDir: 'tests',
  debug: 'app:*',
})

module.exports = debug
