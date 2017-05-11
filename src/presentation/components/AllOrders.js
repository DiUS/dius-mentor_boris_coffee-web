import React, { Component } from 'react'

import Title from './Title'
import OrdersListContainer from '../containers/OrdersListContainer'
import { View } from 'react-native'
import Style from './style'

class AllOrders extends Component {
  render () {
    return (
      <View style={Style.ordersAll}>
        <Title text='All orders' />
        <OrdersListContainer />
      </View>
    )
  }
}

export default AllOrders
