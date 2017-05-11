import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import AppContainer from './presentation/containers/AppContainer'
import reducer from './business/reducers'

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

AppRegistry.registerComponent('ReactNativeWeb', () => ReactNativeWeb)
AppRegistry.runApplication('ReactNativeWeb', { rootTag: document.getElementById('root') })
