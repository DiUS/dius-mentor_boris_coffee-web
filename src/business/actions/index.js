import CoffeeShop from '../../data/service/CoffeeShop'

export const SELECT_ORDER = 'SELECT_ORDER'
export const DESELECT_ORDER = 'DESELECT_ORDER'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

export const REQUEST_ORDER = 'REQUEST_ORDER'
export const RECEIVE_ORDER = 'RECEIVE_ORDER'

export const REQUEST_ORDER_RENAME = 'REQUEST_ORDER_RENAME'
export const RECEIVE_ORDER_RENAME_OK = 'RECEIVE_ORDER_RENAME_OK'

const actions = {
  order: {
    select: (orderId) => ({ type: SELECT_ORDER, orderId }),
    deselect: () => ({ type: DESELECT_ORDER }),

    request: (orderId) => ({ type: REQUEST_ORDER, orderId }),
    receive: (order) => ({ type: RECEIVE_ORDER, order }),

    rename: (orderId, name) => ({ type: REQUEST_ORDER_RENAME, orderId, name }),
    renameOk: (orderId, name) => ({ type: RECEIVE_ORDER_RENAME_OK, orderId, name })
  },

  ordersList: {
    request: () => ({ type: REQUEST_ORDERS_LIST }),
    receive: (orders) => ({ type: RECEIVE_ORDERS_LIST, orders })
  }
}

export const deselectOrder = (dispatch) => {
  dispatch(actions.order.deselect())
}

const service = CoffeeShop()

export const fetchOrdersList = (dispatch) => {
  dispatch(actions.ordersList.request())
  return service.listOrders()
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      return dispatch(actions.ordersList.receive(json.orders))
    })
}

export const fetchOrder = (dispatch, orderId) => {
  dispatch(actions.order.request(orderId))
  return service.getOrder(orderId)
    .catch((error) => {
      console.log(error)
      deselectOrder(dispatch)
      return null
    })
    .then((json) => {
      return dispatch(actions.order.receive(json))
    })
}

export const selectOrder = (dispatch, orderId) => {
  dispatch(actions.order.select(orderId))
  fetchOrder(dispatch, orderId)
}

export const renameOrder = (dispatch, orderId, name) => {
  dispatch(actions.order.rename(orderId, name))
  return service.nameOrder(orderId, name)
    .catch((error) => {
      console.log(error)
      return null
    })
    .then((json) => {
      if (json) {
        return dispatch(actions.order.renameOk(orderId, name))
      }
    })
}

export default {
  selectOrder,
  deselectOrder,
  fetchOrdersList,
  fetchOrder,
  renameOrder
}
