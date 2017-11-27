import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class MainCamera extends Component {
  render() {
    const { innerWidth, innerHeight } = window
    const { name } = this.props
    const cameraPosition = new Vector3(500, 100, 500)
    const lookAt = new Vector3(500, 460, 0)
    return (
      <perspectiveCamera name={name}
        position={cameraPosition}
        aspect={innerWidth / innerHeight}
        lookAt={lookAt}
        near={1}
        far={10000}
        fov={45}
      />
    )
  }
}
