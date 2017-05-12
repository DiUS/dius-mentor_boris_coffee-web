import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import { View, Picker, Item } from 'react-native'
import Style from './style'

import actions from '../../business/actions'
const setMap = {
  style: actions.setCoffeeStyle,
  size: actions.setCoffeeSize
}

class Coffee extends Component {

  render () {
    if (!this.props.coffee) {
      return (<Loading />)
    }

    return (
      <View style={Style.coffee}>
        {this.renderDD('style')}
        {this.renderDD('size')}
      </View>
    )
  }

  renderDD (name) {
    return (
      <Picker
        style={[Style.fill,Style.formCardContainer]}
        selectedValue={this.props.coffee[name]}
        onChangeValue={this.onChangeSelect(name, setMap[name])}>
        <Item label='empty' value='empty'/>
        {this.props.menu[name].map(it => (
          <Item label={it} value={it}/>
        ))}
      </Picker>
    )
  }

  onChangeSelect (name, action) {
    return (e) => {
      const value = e.target.value
      const { dispatch, orderId, coffee } = this.props
      action(dispatch, orderId, coffee.id, value)
    }
  }

}

Coffee.propTypes = {
  coffee: PropTypes.shape({
    id: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }),
  orderId: PropTypes.number.isRequired,
  menu: PropTypes.shape({
    style: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    size: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  })
}

export default Coffee
