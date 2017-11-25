import React, { Component } from 'react'
import { FogExp2 } from 'three'

// NOTE: this component is a work around solution for React3 context bug, where child components can nott access store via connect
export default class SceneWrapper extends Component {
  render() {
    return (
      <scene>
        {
          React.Children.map(this.props.children, child => {
              if (!child) return
              return React.cloneElement(child, { store: this.props.store })
          })
        }
      </scene>
    )
  }
}
