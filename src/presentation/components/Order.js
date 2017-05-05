import React, { Component } from 'react'

import Title from './Title'
import OrderBackContainer from '../containers/OrderBackContainer'

class OrdersAll extends Component {
  render () {
    return (
      <div className='order'>
        <OrderBackContainer />
        <Title text='Order' />
      </div>
    )
  }
}

export default OrdersAll
