import { nFormatter } from '../../../utils'
import { fetch, ProxyAgent } from 'undici'

import debug from 'debug'

const d = debug('api-service')
d.enabled = true

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

export class API {
  /**
   *
   * @param {string} userAgent
   * @param {{ uri: string|URL, rejectUnauthorized?: boolean }|null} proxy
   */
  constructor ({ userAgent, proxy }) {
    this.staticURL = 'https://anilibria.tv'
    this.userAgent = userAgent
    this.baseURL = 'https://api.anilibria.tv'

    if (proxy) {
      this.proxyAgent = new ProxyAgent({
        uri: proxy.uri,
        requestTls: { // Why this? https://github.com/nodejs/undici/issues/1489#issuecomment-1648992497
          rejectUnauthorized: proxy.rejectUnauthorized ?? true
        }
      })
    }
  }

  /**
   * @typedef {object} Params
   * @property {object} [params] Query parameters
   * @property {object} [data] Request body
   * @property {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'HEAD'|'OPTIONS'} [method] Request method
   * @returns {Promise}
   */

  /**
   *
   * @param {string|URL} url
   * @param {Params} [options]
   */
  async request (url, options) {
    const { params, data, method = 'GET' } = options ?? {}

    if (typeof url === 'string') url = new URL(url, this.baseURL)
    if (params) {
      url.search = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, value]) => value !== '' && value !== null && value !== undefined)
        )
      )
    }

    const response = await fetch(url, {
      method,
      headers: { 'User-Agent': this.userAgent },
      body: typeof data === 'object' ? JSON.stringify(data) : data,
      dispatcher: this.proxyAgent
    })

    d(`GET ${url} ${response.status} ${response.statusText}`)

    const text = await response.text()

    try {
      return { ok: response.ok, status: response.status, data: JSON.parse(text) }
    } catch (_) {
      return { ok: response.ok, status: response.status, data: text }
    }
  }

  async init () {
    d('init')
  }

  async dispose () {
    d('dispose')
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
   * @param {number} [options.offset] - The offset number for pagination.
   * @returns {Promise<LastReleasesResult>} Promise object represents the result and the total number of items.
   */
  async getLastReleases (options) {
    const { limit, offset } = options
    const { data: { list, pagination }, ok, data } = await this.request('/v3/title/updates', { params: { limit, after: offset } })

    if (!ok) {
      throw new Error('Failed to fetch last releases', { cause: data })
    }

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
    const { limit, filters } = options

    const query = {}

    for (let [filterKey, filterValue] of Object.entries(filters)) {
      if (filterKey === 'text') filterKey = 'search'
      if (filterValue !== null) query[filterKey] = filterValue?.toString()
    }

    const { data: { list, pagination }, ok, data } = await this.request('/v3/title/search', { params: { limit, ...query } })

    if (!ok) {
      throw new Error('Failed search releases', { cause: data })
    }

    const result = list.map(({ names, id, code, posters, description, genres, in_favorites: rating }) => ({
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
    const { data: { list, pagination }, ok, data } = await this.request('/v3/youtube', { params: { items_per_page: limit, page } })

    if (!ok) {
      throw new Error('Failed to fetch news', { cause: data })
    }

    const result = list.map(({ title, id, preview, youtube_id: youtubeId }) => ({
      name: title,
      id,
      url: 'https://www.youtube.com/watch?v=' + youtubeId,
      // Directly from YouTube, because I don't know why Anilibria server sometimes returns "null" in preview link
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
   * @param [franchises]
   * @return {TransformedRelease}
   */
  transformRelease (release, franchises) {
    const { names, id, code, posters, description, genres, player: { list: episodes, host }, team } = release

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
      episodes: episodes.map(x => {
        return {
          id: x.uuid,
          video: Object.entries(x.hls)
            .filter(([, value]) => value !== null)
            .map(([key, value]) => ({ name: key.toUpperCase(), source: 'https://' + host + value })),
          number: x.episode,
          name: x.name,
          createdAt: x.created_timestamp,
          watched: true
        }
      }),
      cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg'
    }
  }

  /**
   * Returns random release id
   * @return {Promise<number|string>}
   */
  async getRandomRelease () {
    const { data, ok } = await this.request('/v3/title/random')

    if (!ok) {
      throw new Error('Failed to fetch random release', { cause: data })
    }

    return { result: data.id }
  }

  /**
   * Returns release info
   *
   * @param {{ id: number }} options
   * @return {Promise<{ result: TransformedRelease }>}
   */
  async getRelease (options) {
    const { data } = await this.request('/v3/title', {
      params: {
        id: options.id,
        playlist_type: 'array'
      }
    })

    const franchisesResult = []

    for (const franchise of Object.values(data.franchises)) {
      const releases = Object.values(franchise.releases).sort((a, b) => a.ordinal - b.ordinal)

      const fetchedData = await Promise.allSettled(
        releases
          .map(({ id }) => this.request('/v3/title', {
            params: {
              id,
              playlist_type: 'array'
            }
          }))
      )

      for (const { value: { data, status: httpStatus, ok } } of fetchedData) {
        if (!ok) {
          console.warn('Failed to fetch release', data, httpStatus)
        }

        franchisesResult.push(this.transformRelease(data))
      }
    }

    return {
      result: this.transformRelease(data, franchisesResult)
    }
  }

  /**
   * @typedef {object} Filter
   * @property {'select'|'checkbox'} type
   * @property {string} id
   * @property {boolean} [multiple]
   * @property {string} name
   * @property {number|string|array} default
   * @property {array} options
   * @property {boolean} clearable
   * @property {string} dependsOn
   */

  /**
   * Returns Promise with array of {@link Filter}'s
   * @return {Promise<Array<Filter>>}
   */
  async getSearchFilters () {
    const [{ data: years, ok: yearsOk }, { data: genres, ok: genresOk }] = await Promise.all([
      this.request('/v3/years'),
      this.request('/v3/genres')
    ])

    if (!yearsOk) {
      throw new Error('Failed to fetch years', { cause: years })
    }

    if (!genresOk) {
      throw new Error('Failed to fetch genres', { cause: genres })
    }

    return [{
      type: 'select',
      id: 'genres',
      multiple: true,
      name: 'Выберите жанр',
      options: genres.map(genre => ({ value: genre, label: genre })),
      default: [],
      clearable: true
    }, {
      type: 'select',
      multiple: true,
      name: 'Выберите год',
      id: 'year',
      options: years.sort((a, b) => a - b).map(year => ({ value: year, label: year })),
      default: [],
      clearable: true
    }, {
      type: 'select',
      multiple: true,
      name: 'Выберите сезон',
      id: 'season_code',
      options: [
        { value: 1, label: 'Зима' },
        { value: 2, label: 'Весна' },
        { value: 3, label: 'Лето' },
        { value: 4, label: 'Осень' }
      ],
      default: [],
      clearable: true
    },
    {
      type: 'select',
      name: 'Сортировка',
      id: 'order_by',
      options: [
        { value: 'in_favorites', label: 'Рейтинг' },
        { value: 'names.ru', label: 'Название' },
        { value: 'updated', label: 'Новизна' }
      ],
      default: null,
      clearable: true
    }, {
      type: 'select',
      name: 'Направление сортировки',
      id: 'sort_direction',
      options: [
        { value: 0, label: 'По возрастанию' },
        { value: 1, label: 'По убыванию' }
      ],
      default: 1,
      dependsOn: 'order_by'
    }]
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
