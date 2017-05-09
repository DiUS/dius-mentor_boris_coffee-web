import { connect } from 'react-redux'

import Order from '../components/Order'

const OrderContainer = connect(
  ({ order }) => ({ coffees: order ? order.coffees : null })
)(Order)

export default OrderContainer
