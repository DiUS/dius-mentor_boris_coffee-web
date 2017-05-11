import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Style from './style'

class Loading extends Component {

  render () {
    return (
      <View>
        <Text style={[Style.loading, Style.card]}>
          Loading, sucka . . .
        </Text>
      </View>
    )
  }

}

export default Loading
