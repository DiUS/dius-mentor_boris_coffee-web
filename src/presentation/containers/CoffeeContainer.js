import { connect } from 'react-redux'

import Coffee from '../components/Coffee'

const CoffeeContainer = connect(
  ({ coffee, menu }) => ({ coffee, menu })
)(Coffee)

export default CoffeeContainer
