import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config.js'

const wrapRequest = (url) => fetch(
  url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(resp => resp.json())

const Coffee = (url = baseUrl) => ({
  listOrders: () => {
    return wrapRequest(`${url}/order`)
  }
})

export default Coffee
