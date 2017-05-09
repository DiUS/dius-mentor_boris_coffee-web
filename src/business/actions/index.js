import CoffeeShop from '../../data/service/CoffeeShop'

export const SELECT_ORDER = 'SELECT_ORDER'
export const DESELECT_ORDER = 'DESELECT_ORDER'

export const SELECT_COFFEE = 'SELECT_COFFEE'
export const DESELECT_COFFEE = 'DESELECT_COFFEE'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

export const REQUEST_ORDER = 'REQUEST_ORDER'
export const RECEIVE_ORDER = 'RECEIVE_ORDER'

export const REQUEST_ORDER_RENAME = 'REQUEST_ORDER_RENAME'
export const RECEIVE_ORDER_RENAME_OK = 'RECEIVE_ORDER_RENAME_OK'

export const REQUEST_COFFEE = 'REQUEST_COFFEE'
export const RECEIVE_COFFEE = 'RECEIVE_COFFEE'

const actions = {
  coffee: {
    select: (coffeeId) => ({ type: SELECT_COFFEE, coffeeId }),
    deselect: () => ({ type: DESELECT_COFFEE }),

    request: (orderId, coffeeId) => ({ type: REQUEST_COFFEE, orderId, coffeeId }),
    receive: (coffee) => ({ type: RECEIVE_COFFEE, coffee })
  },

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

const toExport = {}

toExport.selectOrder = (dispatch, orderId) => {
  dispatch(actions.order.select(orderId))
  toExport.fetchOrder(dispatch, orderId)
}

toExport.deselectOrder = (dispatch) => {
  dispatch(actions.order.deselect())
  dispatch(actions.order.receive(null))
}

toExport.selectCoffee = (dispatch, orderId, coffeeId) => {
  dispatch(actions.coffee.select(orderId, coffeeId))
  toExport.fetchCoffee(dispatch, orderId, coffeeId)
}

toExport.deselectCoffee = (dispatch) => {
  dispatch(actions.coffee.deselect())
  dispatch(actions.coffee.receive(null))
}

const service = CoffeeShop()

toExport.fetchOrdersList = (dispatch) => {
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

toExport.fetchOrder = (dispatch, orderId) => {
  dispatch(actions.order.request(orderId))
  return service.getOrder(orderId)
    .catch((error) => {
      console.log(error)
      toExport.deselectOrder(dispatch)
      return null
    })
    .then((json) => {
      return dispatch(actions.order.receive(json))
    })
}

toExport.renameOrder = (dispatch, orderId, name) => {
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

toExport.fetchCoffee = (dispatch, orderId, coffeeId) => {
  dispatch(actions.coffee.request(orderId, coffeeId))
  return service.getCoffee(orderId, coffeeId)
    .catch((error) => {
      console.log(error)
      toExport.deselectCoffee(dispatch)
      return null
    })
    .then((json) => {
      return dispatch(actions.coffee.receive(json))
    })
}

export default toExport
