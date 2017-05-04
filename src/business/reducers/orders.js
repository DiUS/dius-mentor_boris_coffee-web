import { RECEIVE_ORDERS_LIST } from '../actions'
const cannedOrders = [
  {
    name: 'Boris',
    coffeeSummaries: [ 'lol', 'face' ]
  }, {
    name: 'Jimothy',
    coffeeSummaries: [ 'fish' ]
  }, {
    name: 'Almenda',
    coffeeSummaries: [ 'hats', 'llamas' ]
  }
]

const orders = (state = cannedOrders, action) => {
  switch (action.type) {
    case RECEIVE_ORDERS_LIST:
      return action.orders.map(it => ({
        name: `${it.id}`,
        coffeeSummaries: [ it.path ] })
      )
    default:
      return state
  }
}

export default orders
