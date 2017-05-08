import { connect } from 'react-redux'

import Order from '../components/Order'

const OrderContainer = connect(({ order }) => ({ order }))(Order)

export default OrderContainer
