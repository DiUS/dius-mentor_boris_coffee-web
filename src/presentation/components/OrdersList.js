import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'

import Add from './Add'
import OrderSummary from './OrderSummary'
import { View } from 'react-native'
import Style from './style'

class OrdersList extends Component {

  addOrder () {
    actions.addOrder(this.props.dispatch)
  }

  render () {
    return (
      <View>
        <View style={Style.ordersList}>
          {this.props.orders.map((it, i) =>
            <OrderSummary {...it} dispatch={this.props.dispatch} key={i} />
          )}
        </View>        
        <View style={Style.addButton}>
  		    <Add label='New order' onClick={(e) => this.addCoffee(e)} />
        </View>
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
