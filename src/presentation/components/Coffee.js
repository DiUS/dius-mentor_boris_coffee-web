import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import { View, Picker, Item } from 'react-native'
import Style from './style'

class Coffee extends Component {

  render () {
    if (!this.props.coffee) {
      return (<Loading />)
    }

    return (
      <View style={Style.coffee}>
        {this.formStyle()}
        {this.formSize()}
      </View>
    )
  }

  setStyle (e) {
  }

  formStyle () {
    return (
      <Picker
        style={[Style.fill,Style.formCardContainer]}
        selectedValue={this.props.coffee.style}
        onChangeValue={(e) => this.setStyle(e)}>
        <Item label='empty' value='empty'/>
        {this.props.menu.style.map(it => (
          <Item label={it} value={it}/>
        ))}
      </Picker>
    )
  }

  setSize (e) {
  }

  formSize () {
    return (
      <Picker
        style={[Style.fill,Style.formCardContainer]}
        selectedValue={this.props.coffee.size}
        onChangeValue={(e) => this.setSize(e)}>
        <Item label='empty' value='empty'/>
        {this.props.menu.size.map(it => (
          <Item label={it} value={it}/>
        ))}
      </Picker>
    )
  }

}

Coffee.propTypes = {
  coffee: PropTypes.shape({
    style: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }),
  menu: PropTypes.shape({
    style: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    size: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  })
}

export default Coffee
