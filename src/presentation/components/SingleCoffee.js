import React, { Component } from 'react'
import { View } from 'react-native'
import Title from './Title'
import CoffeeBackContainer from '../containers/CoffeeBackContainer'
import CoffeeContainer from '../containers/CoffeeContainer'
import Style from './style'

class SingleCoffee extends Component {
  render () {
    return (
      <View style={Style.coffee}>
        <CoffeeBackContainer />
        <Title text='Coffee' />
        <CoffeeContainer />
      </View>
    )
  }
}

export default SingleCoffee
