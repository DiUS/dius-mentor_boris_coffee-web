import Coffee from '../../data/service/Coffee'

export const REQUEST_ORDERS_LIST = 'REQUEST_ORDERS_LIST'
export const RECEIVE_ORDERS_LIST = 'RECEIVE_ORDERS_LIST'

const requestOrdersListAction = () => ({
  type: REQUEST_ORDERS_LIST
})

const receiveOrdersListAction = (orders) => ({
  type: RECEIVE_ORDERS_LIST,
  orders
})

const service = Coffee()

export const fetchOrdersList = (dispatch) => {
  dispatch(requestOrdersListAction())
  return service.listOrders()
    .then((json) => {
      return dispatch(receiveOrdersListAction(json.orders))
    })
}
