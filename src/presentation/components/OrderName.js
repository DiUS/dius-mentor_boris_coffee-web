import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'
import { TextInput, View } from 'react-native'
import Style from './style'

class OrderName extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name
    }
  }

  render () {
    return this.formName(this.state.name)
  }

  staticName () {
    return (<View style={[Style.orderName, Style.noCard]}>{this.state.name}</View>)
  }

  setName () {
    actions.renameOrder(this.props.dispatch, this.props.id, this.state.name)
  }

  formName () {
    return (
      <TextInput style={Style.formCard}
        onChangeText={(name) => this.setState({name})}
        onSubmitEditing={() => this.setName()}
        placeholder='Name'
        multiline={false}
        value={this.state.name}/>
    )
  }

}

OrderName.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default OrderName
