import { RECEIVE_ORDER } from '../actions'

const order = (state = null, action) => {
  switch (action.type) {

    case RECEIVE_ORDER:
      return action.order

    default:
      return state

  }
}

export default order
