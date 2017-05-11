import React, { Component } from 'react'
import { View } from 'react-native'
import Title from './Title'
import OrderBackContainer from '../containers/OrderBackContainer'
import OrderContainer from '../containers/OrderContainer'
import Style from './style'

class SingleOrder extends Component {
  render () {
    return (
      <View>
        <View style={Style.order}>
          <OrderBackContainer />
          <Title text='Order' />
        </View>
        <View style={Style.formCardContainer}>
          <OrderContainer />
        </View>
      </View>
    )
  }
}

export default SingleOrder
