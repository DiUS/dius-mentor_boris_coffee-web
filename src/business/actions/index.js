import CoffeeShop from '../../data/service/CoffeeShop'

export const SELECT_ORDER = 'SELECT_ORDER'
export const DESELECT_ORDER = 'DESELECT_ORDER'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

const actions = {
  order: {
    select: (orderId) => ({
      type: SELECT_ORDER,
      orderId
    }),
    deselect: () => ({
      type: DESELECT_ORDER
    })
  },
  ordersList: {
    request: () => ({
      type: REQUEST_ORDERS_LIST
    }),
    receive: (orders) => ({
      type: RECEIVE_ORDERS_LIST,
      orders
    })
  }
}

export const selectOrder = (dispatch, orderId) => {
  dispatch(actions.order.select(orderId))
}

export const deselectOrder = (dispatch) => {
  dispatch(actions.order.deselect())
}

const service = CoffeeShop()

export const fetchOrdersList = (dispatch) => {
  dispatch(actions.ordersList.request())
  return service.listOrders()
    .then((json) => {
      return dispatch(actions.ordersList.receive(json.orders))
    })
}

export default {
  selectOrder,
  deselectOrder,
  fetchOrdersList
}
