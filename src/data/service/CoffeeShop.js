import fetch from 'isomorphic-fetch'
import { baseUrl } from '../../config'

const mimeJson = 'application/json'
const headers = { 'Content-Type': mimeJson, 'Accept': mimeJson }
const wrapRequest = (url) => fetch(url, { headers }).then(resp => resp.json())

const CoffeeShop = (url = baseUrl) => ({

  // orders
  listOrders: () => wrapRequest(`${url}/order`),
  getOrder: (orderId) => wrapRequest(`${url}/order/${orderId}`)

  // coffees

})

export default CoffeeShop
