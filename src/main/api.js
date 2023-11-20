import { enable } from '../utils/axios-debug-logger'
enable()
import { nFormatter } from '../utils'
import axios from 'axios'


/* Mock */
const userLists = []
userLists.push(
  mockList('Смотрю'),
  mockList('Запланировано'),
  mockList('Пересматриваю'),
  mockList('Любимое'),
  mockList('Брошено')
)

function mockList (title) {
  return {
    id: Math.random().toString(),
    title,
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
/* Mock */

  constructor () {
    this.staticURL = 'https://anilibria.tv/'
export class API {
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
      genres: genres.map(x => ({ id: x, label: x })),
      rating,
      ratingFormated: nFormatter(rating)
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
   * Posters object
   * @typedef {object} Posters
   * @property {string} small
   * @property {string} original
   * @property {string} medium
   */
  /**
   * Genre object
   * @typedef {object} Genre
   * @property {string} id
   * @property {string} label
   */

  /**
   * Transformed release object
   * @typedef {object} TransformedRelease
   * @property {string} description
   * @property {string} id
   * @property {Release[]} [franchises]
   * @property {{ru: string, en: string}} names
   * @property {string} code
   * @property {Genre[]} genres
   * @property {Posters} posters
   */

  /**
   * Transforms release object
   * @param release
   * @param franchises
   * @return {TransformedRelease}
   */
  transformRelease (release, franchises) {
    const { names, id, code, posters, description, genres, player: { list: episodes }, team } = release

    return {
      names: {
        ru: names.ru,
        en: names.en
      },
      id,
      code,
      team: {
        voice: team.voice ?? [],
        translator: team.translator ?? [],
        editing: team.editing ?? [],
        decor: team.decor ?? [],
        timing: team.timing ?? []
      },
      franchises,
      posters: {
        small: this.staticURL + posters.small?.url,
        medium: this.staticURL + posters.medium?.url,
        original: this.staticURL + posters.original?.url
      },
      description,
      genres: genres.map(x => ({ id: x, label: x })),
      episodes: episodes.map(x => ({ id: x.uuid, number: x.episode, name: x.name, createdAt: x.created_timestamp, watched: true })),
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg'
    }
  }

  /**
   * Returns random release id
   * @return {Promise<number|string>}
   */
  async getRandomRelease () {
    const { data } = await this.client.get('/title/random')
    return { result: data.id }
  }

  /**
   * Returns release info
   *
   * @param {{ id: number }} options
   * @return {Promise<{ result: TransformedRelease }>}
   */
  async getRelease (options) {
    const { data } = await this.client.get('/title', {
      params: {
        id: options.id,
        playlist_type: 'array'
      }
    })

    const franchisesResult = []

    for (const franchise of Object.values(data.franchises)) {
      const releases = Object.values(franchise.releases).sort((a, b) => a.ordinal - b.ordinal)
      const ids = releases.map(x => x.id)

      const { data: fetchedReleases } = await this.client.get('/title/list', {
        params: {
          id_list: ids.join(','),
          playlist_type: 'array'
        }
      })

      franchisesResult.push(...fetchedReleases.map(x => this.transformRelease(x)))
    }

    return {
      result: this.transformRelease(data, franchisesResult)
    }
  }

  async getUserLists () {
    return userLists
  }

  async createUserList (options) {
    userLists.push(mockList(options.title))

    return { result: true }
  }

  async patchUserList () {

  }
}
