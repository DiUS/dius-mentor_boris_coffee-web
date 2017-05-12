import React, { Component } from 'react'
import { Button } from 'react-native'
import PropTypes from 'prop-types'

class Add extends Component {

  render () {
    return (
      <Button title={this.props.label} onPress={this.props.onClick} color='green'/>
    )
  }

}

Add.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Add
