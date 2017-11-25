import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '@src/rootReducer'

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware()
    )
  )
  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
