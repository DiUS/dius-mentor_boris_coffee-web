import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'

class Coffee extends Component {

  render () {
    if (!this.props.coffee) {
      return (<Loading />)
    }

    return (
      <div className='coffee'>
        {this.formStyle()}
        {this.formSize()}
      </div>
    )
  }

  setStyle (e) {
  }

  formStyle () {
    return (
      <form className='form-card'>
        <select
          name='style'
          className='coffee-style form-card'
          value={this.props.coffee.style}
          onChange={(e) => this.setStyle(e)}
        >
          <option key='empty' />
          {this.props.menu.style.map(it => (
            <option key={it}>
              {it}
            </option>
          ))}
        </select>
      </form>
    )
  }

  setSize (e) {
  }

  formSize () {
    return (
      <form className='form-card'>
        <select
          name='size'
          className='coffee-size form-card'
          value={this.props.coffee.size}
          onChange={(e) => this.setSize(e)}
        >
          <option key='empty' />
          {this.props.menu.size.map(it => (
            <option key={it}>
              {it}
            </option>
          ))}
        </select>
      </form>
    )
  }

}

Coffee.propTypes = {
  coffee: PropTypes.shape({
    style: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  }),
  menu: PropTypes.shape({
    style: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    size: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  })
}

export default Coffee
