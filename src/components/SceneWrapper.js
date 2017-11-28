import React, { Component } from 'react'
import { Fog } from 'three'

// NOTE: this component is a work around solution for React3 context bug, where child components can nott access store via connect
export default class SceneWrapper extends Component {
  render() {
    return (
      <scene fog={new Fog(0xCCCFFF, 200, 1500)}>
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
