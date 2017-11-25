import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { configureStore } from './store/configureStore'
import { connect } from 'react-redux'

import CanvasContainer from '@src/components/Canvas/CanvasContainer'

const store = configureStore()

render(
  <Provider store={store}>
    <CanvasContainer store={store} />
  </Provider>,
  document.getElementById('app')
)
