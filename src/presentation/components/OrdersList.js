import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OrderSummary from './OrderSummary'

class OrdersList extends Component {
  render () {
    return (
      <div className='orders-list'>
        {this.props.orders.map((it, i) =>
          <OrderSummary {...it} dispatch={this.props.dispatch} key={i} />
        )}
      </div>
    )
  }
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    coffeeSummaries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired).isRequired
}

export default OrdersList
