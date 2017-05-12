import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import actions from '../../business/actions'

import Add from './Add'
import CoffeeSummary from './CoffeeSummary'
import Loading from './Loading'
import OrderNameContainer from '../containers/OrderNameContainer'
import Style from './style'

class Order extends Component {

  addCoffee () {
    actions.addCoffee(this.props.dispatch, this.props.id)
  }

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
        <View style={Style.addButton}>
  		    <Add label='Add coffee' onClick={(e) => this.addCoffee(e)} />
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
