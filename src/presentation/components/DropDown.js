import React, { Component } from 'react'
import { View, Picker, Text, Item } from 'react-native'
import PropTypes from 'prop-types'
import Style from './style'

const capitalise = (value) => value.charAt(0).toUpperCase() + value.slice(1)

class DropDown extends Component {

  render () {
    const { name, value, options, onChange } = this.props
    return (
      <View style={Style.order}>
        <Text style={Style.formLabel}>{capitalise(name)}</Text>
        <Text>{value}</Text>
        {options.map(it => (
          <Text>{it}</Text>
        ))}
        <Picker
          style={[Style.fill,Style.formCardContainer]}
          selectedValue={value}
          onChangeValue={(e) => this.onChange(e)}>
          {options.map(it => (
            <Item label={it} value={it}/>
          ))}
        </Picker>
      </View>
    )
  }

}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired
}

export default DropDown
