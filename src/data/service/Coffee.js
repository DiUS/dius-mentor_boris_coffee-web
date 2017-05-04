import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config'

const mimeJson = 'application/json'
const headers = { 'Content-Type': mimeJson, 'Accept': mimeJson }
const wrapRequest = (url) => fetch(url, { headers }).then(resp => resp.json())

const Coffee = (url = baseUrl) => ({
  listOrders: () => wrapRequest(`${url}/order`)
})

export default Coffee
