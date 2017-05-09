import React, { Component } from 'react'

import Title from './Title'
import CoffeeBackContainer from '../containers/CoffeeBackContainer'

class SingleCoffee extends Component {
  render () {
    return (
      <div className='coffee'>
        <CoffeeBackContainer />
        <Title text='Coffee' />
      </div>
    )
  }
}

export default SingleCoffee
