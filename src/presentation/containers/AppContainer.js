import { connect } from 'react-redux'

import App from '../components/App'

const AppContainer = connect(state => state.selected)(App)

export default AppContainer
