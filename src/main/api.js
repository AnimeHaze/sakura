require('axios-debug-log/enable')

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

  async searchReleases (options) {
    // eslint-disable-next-line no-unused-vars
    const { limit, page, filters, search } = options

    const { data: { list, pagination } } = await this.client.get('/title/search', { params: { limit, page, search } })

    const result = list.map(({ names, id, code, posters, description, genres }) => ({
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
      },
      description,
      genres: genres.map(x => ({ id: x, label: x }))
    }))

    return {
      result,
      total: pagination.total_items,
      pages: pagination.pages
    }
  }

  async getNews (options) {
    const { limit, page } = options
    const { data: { list, pagination } } = await this.client.get('/youtube', { params: { items_per_page: limit, page } })

    const result = list.map(({ title, id, preview, youtube_id: youtubeId }) => ({
      title,
      id,
      url: 'https://www.youtube.com/watch?v=' + youtubeId,
      // Directly from YouTube, because I don't now why Anilibria server sometimes returns "null" in preview link
      preview: preview.src ? this.staticURL + preview.src : 'https://i3.ytimg.com/vi/' + youtubeId + '/hqdefault.jpg'
    }))

    return {
      result,
      total: pagination.total_items
    }
  }

  /**
   * @param {{ id: number }} options
   * @return {Promise<{names: {ru, en}, code: undefined, genres: *, posters: {small: string, original: string, medium: string}, description: undefined, id: undefined}>}
   */
  async getRelease (options) {
    const { data: { names, id, code, posters, description, genres } } = await this.client.get('/title', { params: { id: options.id } })

    return {
      result: {
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
        },
        description,
        genres: genres.map(x => ({ id: x, label: x }))
      }
    }
  }
}

module.exports = { API }
