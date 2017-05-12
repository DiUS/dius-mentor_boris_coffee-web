import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Button, TouchableHighlight } from 'react-native'
import Style from './style'

import actions from '../../business/actions'

class OrderSummary extends Component {

  select () {
    actions.selectOrder(this.props.dispatch, this.props.id)
  }

  delete() {

  }

  render () {
    const { name, coffeeSummaries: summaries } = this.props
    return (
      <View style={Style.rowContainer}>
        <View style={Style.fill}>
          <TouchableHighlight style={Style.orderRow} onPress={(e) => this.select(e)}>
            <View>
              <Text style={Style.orderName}>{'- '+name}</Text>
              {summaries.map((it, i) =>
                <Text key={i}>{it}</Text>
              )}
            </View>
          </TouchableHighlight>
        </View>
        <View style={Style.deleteCard}>
          <Button title={'X'} color='red' onPress={(e) => this.delete(e)}/>
        </View>
      </View>
    )
  }

}

OrderSummary.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coffeeSummaries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default OrderSummary
