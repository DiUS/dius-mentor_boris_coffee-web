import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
import CoffeeSummary from './CoffeeSummary'
import OrderNameContainer from '../containers/OrderNameContainer'

class Order extends Component {

  render () {
    const { coffees } = this.props
    if (!coffees) {
      return (<Loading />)
    }

    return (
      <div className='order'>
        <OrderNameContainer />
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
  coffees: PropTypes.arrayOf(PropTypes.shape({
    summary: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  }))
}

export default Order
