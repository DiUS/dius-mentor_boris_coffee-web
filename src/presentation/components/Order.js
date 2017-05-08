import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import CoffeeSummary from './CoffeeSummary'

class Order extends Component {

  render () {
    if (!this.props.order) {
      return (<Loading />)
    }

    const { name, coffees } = this.props.order
    return (
      <div className='order'>
        <div className='order-name no-card'>{name}</div>
        <div className='coffees-list'>
          {coffees.map((it, i) =>
            <CoffeeSummary {...it} dispatch={this.props.dispatch} key={i} />
          )}
        </div>
      </div>
    )
  }
}

Order.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coffees: PropTypes.arrayOf(PropTypes.shape({
      summary: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })).isRequired
  })
}

export default Order
