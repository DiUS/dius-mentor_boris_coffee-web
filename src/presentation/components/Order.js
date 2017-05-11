import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import Loading from './Loading'
import CoffeeSummary from './CoffeeSummary'
import OrderNameContainer from '../containers/OrderNameContainer'
import Style from './style'

class Order extends Component {

  render () {
    const { coffees, id, dispatch } = this.props
    if (!coffees) {
      return (<Loading />)
    }

    return (
      <View>
        <OrderNameContainer />
        <View style={Style.coffeesList}>
          {coffees.map((it, i) =>
            <CoffeeSummary {...it} orderId={id} dispatch={dispatch} key={i} />
          )}
        </View>
      </View>
    )
  }

}

Order.propTypes = {
  coffees: PropTypes.arrayOf(PropTypes.shape({
    summary: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  id: PropTypes.number.isRequired
}

export default Order
