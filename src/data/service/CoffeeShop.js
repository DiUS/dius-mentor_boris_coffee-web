import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config'

const mimeJson = 'application/json'
const headers = { 'Content-Type': mimeJson, 'Accept': mimeJson }
const wrapRequest = (url) => fetch(url, { headers })
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
  getOrder: (orderId) => wrapRequest(`${url}/order/${orderId}`)

  // coffees

})

export default CoffeeShop
