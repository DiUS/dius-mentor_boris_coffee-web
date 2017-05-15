import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Loading from './Loading'
import DropDown from './DropDown'
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
      <DropDown
        name={name}
        value={this.props.coffee[name]}
        options={this.props.menu[name]}
        onChange={this.onChangeSelect(name, setMap[name])}
      />
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
