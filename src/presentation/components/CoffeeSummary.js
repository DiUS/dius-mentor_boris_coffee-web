import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

import DeleteX from './DeleteX'
import actions from '../../business/actions'
import Style from './style'

class CoffeeSummary extends Component {

  select () {
    actions.selectCoffee(this.props.dispatch, this.props.orderId, this.props.id)
  }

  cancel () {
    actions.cancelCoffee(this.props.dispatch, this.props.orderId, this.props.id)
  }

  render () {
    return (
      <View style={Style.rowContainer}>
        <View style={Style.fill}>
          <TouchableHighlight style={Style.orderRow} onPress={(e) => this.select(e)}>
            <View>
              <Text style={Style.orderName}>{this.props.summary}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={Style.deleteCard}>
          <DeleteX onClick={(e) => this.cancel(e)}/>
        </View>
      </View>
    )
  }

}

CoffeeSummary.propTypes = {
  id: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired
}

export default CoffeeSummary
