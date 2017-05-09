import React, { Component } from 'react'
import PropTypes from 'prop-types'

import actions from '../../business/actions'

class OrderName extends Component {

  render () {
    return this.formName(this.props.name)
  }

  staticName (name) {
    return (<div className='order-name no-card'>{name}</div>)
  }

  setName (e) {
    e.preventDefault()
    const name = e.target.name.value
    actions.renameOrder(this.props.dispatch, this.props.id, name)
  }

  formName (name) {
    return (
      <form className='form-card' onSubmit={(e) => this.setName(e)}>
        <input name='name' className='order-name form-card' type='text' placeholder='Name' defaultValue={name} />
      </form>
    )
  }

}

OrderName.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default OrderName
