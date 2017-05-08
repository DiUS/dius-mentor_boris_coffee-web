import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CoffeeSummary extends Component {

  select () {
  }

  render () {
    const { summary } = this.props
    return (
      <div className='coffee-summary card' onClick={(e) => this.select(e)}>
        <span className='delete-card'>✕</span>
        <div className='coffee-summary'>{summary}</div>
      </div>
    )
  }

}

CoffeeSummary.propTypes = {
  id: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default CoffeeSummary
