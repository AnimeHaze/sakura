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
