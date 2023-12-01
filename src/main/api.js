import { enable } from '../utils/axios-debug-logger'
import { nFormatter } from '../utils'
import axios from 'axios'
enable()

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
    const { limit, filters } = options

    const query = {}

    for (let [filterKey, filterValue] of Object.entries(filters)) {
      if (filterKey === 'text') filterKey = 'search'
      if (filterValue !== null) query[filterKey] = filterValue?.toString()
    }

    const { data: { list, pagination } } = await this.client.get('/title/search', { params: { limit, ...query } })

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
      episodes: episodes.map(x => ({
        id: x.uuid,
        video: [
          { name: 'FHD', source: 'https://' + host + x.hls.fhd },
          { name: 'HD', source: 'https://' + host + x.hls.hd },
          { name: 'SD', source: 'https://' + host + x.hls.sd }
        ],
        number: x.episode,
        name: x.name,
        createdAt: x.created_timestamp,
        watched: true
      })),
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

      const fetchedData = await Promise.allSettled(
        releases
          .map(({ id }) => this.client.get('/title', {
            params: {
              id,
              playlist_type: 'array'
            }
          }))
      )

      for (const { value: { data }, status, reason } of fetchedData) {
        if (status !== 'fulfilled' && reason) {
          if (axios.isAxiosError(reason)) {
            console.log(reason, reason.response.status)
          } else throw reason
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
    const [{ data: years }, { data: genres }] = await Promise.all([
      this.client.get('/years'),
      this.client.get('/genres')
    ])

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
        { value: 'names.ru', label: 'Название' }
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
