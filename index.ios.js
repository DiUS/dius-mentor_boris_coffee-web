import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppContainer from './src/presentation/containers/AppContainer'
import reducer from './src/business/reducers'

const store = createStore(reducer)

class ReactNativeWeb extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('coffeeWeb', () => ReactNativeWeb)
