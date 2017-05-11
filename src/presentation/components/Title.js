import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import Style from './style'

class Title extends Component {
  render () {
    return (<Text style={Style.title}>{this.props.text}</Text>)
  }
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}

export default Title
