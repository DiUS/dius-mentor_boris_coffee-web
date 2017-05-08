import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config'

const mimeJson = 'application/json'
const headers = { 'Content-Type': mimeJson, 'Accept': mimeJson }
const GET = 'GET'
const PATCH = 'PATCH'

const transformBody = (body) => {
  if (body) {
    return JSON.stringify(body)
  }
  return null
}
const wrapRequest = (url, method = GET, body = null) =>
  fetch(url, { method, headers, body: transformBody(body) })
  .then((resp) => {
    const json = resp.json()
    if (resp.status >= 400) {
      return json.then((errorJson) => {
        const error = {
          status: resp.status,
          message: errorJson.message
        }
        throw error
      })
    } else {
      return json
    }
  })

const CoffeeShop = (url = baseUrl) => ({

  // orders
  listOrders: () => wrapRequest(`${url}/order`),
  getOrder: (orderId) => wrapRequest(`${url}/order/${orderId}`),
  nameOrder: (orderId, name) => wrapRequest(`${url}/order/${orderId}`, PATCH, { name })

  // coffees

})

export default CoffeeShop
