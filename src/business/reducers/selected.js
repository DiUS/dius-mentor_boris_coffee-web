import {
  SELECT_ORDER, DESELECT_ORDER
} from '../actions'

const initialState = {
  orderId: null,
  coffeeId: null
}

const selected = (state = initialState, action) => {
  switch (action.type) {

    case SELECT_ORDER:
      return { ...state, orderId: action.orderId }

    case DESELECT_ORDER:
      return { ...state, orderId: null }

    default:
      return state

  }
}

export default selected
