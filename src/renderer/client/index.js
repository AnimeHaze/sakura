import axios from 'axios'
import meta from '../../../package.json'

export function createClient () {
  const options = {}
  options.baseURL = process.env.API_ENDPOINT
  options.headers = {
    'user-agent': meta.productName + '/' + meta.version
  }
  return axios.create(options)
}
