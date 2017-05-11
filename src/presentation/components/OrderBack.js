import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

import actions from '../../business/actions'
import Style from './style'

class OrderBack extends Component {

  back () {
    actions.deselectOrder(this.props.dispatch)
  }

  render () {
    return (
      <TouchableHighlight onPress={(e) => this.back(e)}>
        <View>
          <Text style={[Style.title,Style.navBack, Style.fill]}>‹</Text>
        </View>
      </TouchableHighlight>
    )
  }

}

export default OrderBack
