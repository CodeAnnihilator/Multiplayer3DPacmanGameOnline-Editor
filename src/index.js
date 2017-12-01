import 'babel-polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { configureStore } from './store/configureStore'
import { connect } from 'react-redux'

import Main from '@src/components/Main'

const store = configureStore()

render(
  <Provider store={store}>
    <Main store={store} />
  </Provider>,
  document.getElementById('app')
)
