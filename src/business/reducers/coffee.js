import { RECEIVE_COFFEE } from '../actions'

const order = (state = null, action) => {
  switch (action.type) {

    case RECEIVE_COFFEE:
      return action.coffee

    default:
      return state

  }
}

export default order
