import React, { Component } from 'react'

import CanvasContainer from '@src/components/Canvas/CanvasContainer'
import Interface from '@src/components/Interface/Interface'

export default class Main extends Component {
  render() {
    const { store } = this.props
    return (
      <div>
        <Interface />
        <CanvasContainer store={store} />
      </div>
    )
  }
}
