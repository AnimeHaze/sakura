/**
 * Formats number
 * @param {number} num Number to format
 * @param {number} [digits] Digits
 * @return {string|string}
 */
export function nFormatter (num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

  const item = [...lookup].reverse().find(function (item) {
    return num >= item.value
  })

  return item
    ? (num / item.value)
        .toFixed(digits)
        .replace(rx, '$1') + item.symbol
    : '0'
}

/**
 * Can debounce function calls
 * @param {Function} f Function for debounce
 * @param {number} ms Timeout
 * @return {Function}
 */
export function debounce (f, ms) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      f(...args)
    }, ms)
  }
}

/**
 * Declines depending on the number
 * @param {number} number
 * @param {string[]} titles Strings for decline
 * @param {boolean} [full=false] If true - returns number + string
 * @return {string}
 */
export function declOfNum (number, titles, full = false) {
  const cases = [2, 0, 1, 1, 1, 2]

  const result = titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
  return full ? `${number} ${result}` : result
}

export function getRandomIntInclusive (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function pointInRect (rectX, rectY, rectWidth, rectHeight, x, y) {
  return rectX <= x && x <= rectX + rectWidth &&
    rectY <= y && y <= rectY + rectHeight
}

export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Checks is proto allowed for shell.openExternal()
 * @param url URL to check
 * @return {boolean}
 */
export function isOpenShellSecure (url) {
  const { protocol } = new URL(url)

  return ['mailto:', 'https:', 'http:', 'tel:', 'tg:'].includes(protocol)
}

/**
 * Returns base url
 * @param {string} url
 * @return {string}
 */
export function getBaseURL (url) {
  const { protocol, hostname, port } = new URL(url)

  return protocol + '//' + hostname + (port ? ':' + port : '')
}

/**
 * Parsing function arguments names
 * @param fn {function}
 * @return {array}
 */
export function getFunctionArgs (fn) {
  let src = fn.toString()
  src = src.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg, '')
  src = src.replace('async', '')

  const bi = src.indexOf('(')
  const ai = src.indexOf('=>')

  let args = ai > 0 && (ai < bi || bi < 0)
    ? src.slice(0, ai)
    : src.slice(bi + 1, src.indexOf(')'))

  args = args.replace(/\s+/g, '')

  return args ? args.split(',') : []
}
