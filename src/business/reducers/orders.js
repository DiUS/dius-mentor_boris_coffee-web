import { RECEIVE_ORDERS_LIST, RECEIVE_ORDER_RENAME_OK } from '../actions'

const findOrderById = (id, state) => state.find(it => it.id === id)

const orders = (state = [], action) => {
  switch (action.type) {

    case RECEIVE_ORDERS_LIST:
      return action.orders

    case RECEIVE_ORDER_RENAME_OK:
      const newState = [ ...state ]
      findOrderById(action.orderId, newState).name = action.name
      return newState

    default:
      return state

  }
}

export default orders
