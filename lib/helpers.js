/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * @returns {string}
 */
function getRandomColor() {
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'gray']
  const randomIndex = randomIntFromInterval(0, colors.length - 1)

  return colors[randomIndex]
}

/**
 * @param {number} num
 * @param {number} [padding]
 * @returns {string}
 */
function pad(num, padding = 2) {
  return String(Math.floor(Math.abs(num))).padStart(padding, '0')
}

/**
 * @param {number} timestamp
 * @returns {string}
 */
function formatTime(timestamp) {
  const date = new Date(timestamp)

  const tzo = -date.getTimezoneOffset()

  const sign = tzo >= 0 ? '+' : '-'

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    '.' +
    pad(date.getMilliseconds(), 3) +
    sign +
    pad(tzo / 60) +
    ':' +
    pad(tzo % 60)
  )
}

/**
 * @param {string} tagName
 * @param {string} [DEBUG]
 * @returns {boolean}
 */
function isSilent(tagName, DEBUG = process.env.DEBUG) {
  if (!DEBUG) {
    return true
  }

  const isEnabled = DEBUG.split(',')
    .map((namespace) => namespace.split(':')[0])
    .some((parentTag) => parentTag === '*' || tagName.startsWith(parentTag))

  return !isEnabled
}

module.exports = {
  getRandomColor,
  formatTime,
  isSilent,
}
