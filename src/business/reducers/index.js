import { combineReducers } from 'redux'

import selected from './selected'
import orders from './orders'

const rootReducer = combineReducers({
  selected,
  orders
})

export default rootReducer
