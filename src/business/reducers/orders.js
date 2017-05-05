import { RECEIVE_ORDERS_LIST } from '../actions'

const orders = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_ORDERS_LIST:
      return action.orders

    default:
      return state

  }
}

export default orders
