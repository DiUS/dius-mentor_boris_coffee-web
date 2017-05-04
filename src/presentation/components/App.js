import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { fetchOrdersList } from '../../business/actions'
import AllOrders from './AllOrders'

class App extends Component {

  componentDidMount () {
    fetchOrdersList(this.props.dispatch)
  }

  render () {
    const { orderId, coffeeId } = this.props
    if (coffeeId) {
      return (
        <div>Placeholder: edit coffee {coffeeId}</div>
      )
    }

    if (orderId) {
      return (
        <div>Placeholder: edit order {orderId}</div>
      )
    }

    return (
      <AllOrders />
    )
  }

}

App.propTypes = {
  orderId: PropTypes.number,
  coffeeId: PropTypes.number
}

export default App
