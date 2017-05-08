import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import CoffeeSummary from './CoffeeSummary'

import actions from '../../business/actions'

class Order extends Component {

  render () {
    if (!this.props.order) {
      return (<Loading />)
    }

    const { name, coffees } = this.props.order
    return (
      <div className='order'>
        {this.formName(name)}
        <div className='coffees-list'>
          {coffees.map((it, i) =>
            <CoffeeSummary {...it} dispatch={this.props.dispatch} key={i} />
          )}
        </div>
      </div>
    )
  }

  staticName (name) {
    return (<div className='order-name no-card'>{name}</div>)
  }

  setName (e) {
    e.preventDefault()
    actions.renameOrder(this.props.dispatch, this.props.order.id, e.target.name.value)
  }

  formName (name) {
    return (
      <form className='form-card' onSubmit={(e) => this.setName(e)}>
        <input name='name' className='order-name form-card' type='text' placeholder='Name' defaultValue={name} />
      </form>
    )
  }

}

Order.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coffees: PropTypes.arrayOf(PropTypes.shape({
      summary: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })).isRequired
  })
}

export default Order
