import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OrderSummary from './OrderSummary'
import { View } from 'react-native'
import Style from './style'

class OrdersList extends Component {
  render () {
    return (
      <View style={Style.ordersList}>
        {this.props.orders.map((it, i) =>
          <OrderSummary {...it} dispatch={this.props.dispatch} key={i} />
        )}
      </View>
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
