const axios = require('axios')

class API {
  constructor () {
    this.staticURL = 'https://anilibria.tv/'
    this.client = axios.create({
      baseURL: 'https://api.anilibria.tv/v3'
    })
  }

  /**
   * @typedef {object} Name
   * @property {string} ru
   * @property {string} en
   */

  /**
   * @typedef {object} LastReleasePoster
   * @property {string} small
   * @property {string} medium
   * @property {string} original
   */

  /**
   * @typedef {object} LastReleasesItem
   * @property {Name} names
   * @property {string} id
   * @property {string} code
   * @property {LastReleasePoster} posters
   */

  /**
   * @typedef {object} LastReleasesResult
   * @property {Array<LastReleasesItem>} result
   * @property {number} total
   */

  /**
   * Returns latest releases with pagination
   * @param {object} options - Options for the fetch request.
   * @param {number} options.limit - Limit for the number of items in the response.
   * @param {number} options.offset - The offset number for pagination.
   * @returns {Promise<LastReleasesResult>} Promise object represents the result and the total number of items.
   */
  async getLastReleases (options) {
    const { limit, offset } = options
    const { data: { list, pagination } } = await this.client.get('/title/updates', { params: { limit, after: offset } })

    const result = list.map(({ names, id, code, posters }) => ({
      names: {
        ru: names.ru,
        en: names.en
      },
      id,
      code,
      posters: {
        small: this.staticURL + posters.small?.url,
        medium: this.staticURL + posters.medium?.url,
        original: this.staticURL + posters.original?.url
      }
    }))

    return {
      result,
      total: pagination.total_items
    }
  }
}

module.exports = { API }
