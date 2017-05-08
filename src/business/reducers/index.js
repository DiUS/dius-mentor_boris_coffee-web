import { combineReducers } from 'redux'

import selected from './selected'
import order from './order'
import orders from './orders'

const rootReducer = combineReducers({
  selected,
  order,
  orders
})

export default rootReducer
