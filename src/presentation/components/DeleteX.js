import React, { Component } from 'react'
import { Button } from 'react-native'
import PropTypes from 'prop-types'

class DeleteX extends Component {

  render () {
    return (<Button title={'X'} color='red' onPress={this.props.onClick}/>)
  }

}

DeleteX.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DeleteX
