import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OrderSummary extends Component {
  render () {
    const { name, coffeeSummaries: summaries } = this.props
    return (
      <div className='order-summary'>
        <span className='delete-card'>✕</span>
        <div className='order-name'>{name}</div>
        {summaries.map((it, i) =>
          <div className='order-coffee-summary' key={i}>{it}</div>
        )}
      </div>
    )
  }
}

OrderSummary.propTypes = {
  name: PropTypes.string.isRequired,
  coffeeSummaries: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default OrderSummary
