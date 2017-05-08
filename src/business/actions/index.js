import CoffeeShop from '../../data/service/CoffeeShop'

export const SELECT_ORDER = 'SELECT_ORDER'
export const DESELECT_ORDER = 'DESELECT_ORDER'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

export const REQUEST_ORDER = 'REQUEST_ORDER'
export const RECEIVE_ORDER = 'RECEIVE_ORDER'

const actions = {
  order: {
    select: (orderId) => ({ type: SELECT_ORDER, orderId }),
    deselect: () => ({ type: DESELECT_ORDER }),

    request: (orderId) => ({ type: REQUEST_ORDER, orderId }),
    receive: (order) => ({ type: RECEIVE_ORDER, order })
  },

  ordersList: {
    request: () => ({ type: REQUEST_ORDERS_LIST }),
    receive: (orders) => ({ type: RECEIVE_ORDERS_LIST, orders })
  }
}

const service = CoffeeShop()

export const fetchOrdersList = (dispatch) => {
  dispatch(actions.ordersList.request())
  return service.listOrders()
    .then((json) => {
      return dispatch(actions.ordersList.receive(json.orders))
    })
}

export const fetchOrder = (dispatch, orderId) => {
  dispatch(actions.order.request(orderId))
  return service.getOrder(orderId)
    .then((json) => {
      return dispatch(actions.order.receive(json))
    })
}

export const selectOrder = (dispatch, orderId) => {
  dispatch(actions.order.select(orderId))
  fetchOrder(dispatch, orderId)
}

export const deselectOrder = (dispatch) => {
  dispatch(actions.order.deselect())
}

export default {
  selectOrder,
  deselectOrder,
  fetchOrdersList,
  fetchOrder
}
