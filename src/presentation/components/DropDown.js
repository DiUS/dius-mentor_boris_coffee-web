import React, { Component } from 'react'
import PropTypes from 'prop-types'

class DropDown extends Component {

  render () {
    const { name, value, options, onChange } = this.props
    return (
      <form className='form-card'>
        <select
          name={name}
          className={`coffee-${name} form-card`}
          value={value}
          onChange={(e) => onChange(e)}
        >
          <option key='empty' />
          {options.map(it => (
            <option key={it}>{it}</option>
          ))}
        </select>
      </form>
    )
  }

}

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onChange: PropTypes.func.isRequired
}

export default DropDown
