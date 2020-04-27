const { createLogger, transports } = require('winston')
const { getTagName } = require('create-debug')
const { format } = require('logform')
const { getRandomColor, formatTime, isSilent } = require('./helpers')

const colorizer = format.colorize()

/**
 * @typedef Configuration
 * @property {string} rootDir
 * @property {string} prefix
 * @property {string} [debug]
 */

/**
 * @param {NodeModule} module
 * @param {Configuration} config
 * @returns {import('winston').LeveledLogMethod}
 */
function createDebug(module, config) {
  const tag = getTagName(module.filename, config)

  colorizer.addColors({
    [tag]: getRandomColor(),
    ms: 'magenta',
    now: 'yellow',
  })

  const logger = createLogger({
    silent: isSilent(tag, config.debug),
    format: format.combine(
      format.splat(),
      format.ms(),
      format.timestamp(),
      format.label({ label: tag }),
      format.printf(({ timestamp, message, label, ms }) => {
        const coloredLabel = colorizer.colorize(label, `[${label}]`)
        const coloredNow = colorizer.colorize('now', formatTime(timestamp))
        const coloredMs = colorizer.colorize('ms', ms)

        return `${coloredLabel} ${coloredNow}: ${message} ${coloredMs}`
      })
    ),
    transports: [
      new transports.Console({
        level: 'debug',
      }),
    ],
  })

  return logger.debug.bind(logger)
}

module.exports = {
  formatTime,
  createDebug,
}
