import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class MainCamera extends Component {
  render() {
    const { innerWidth, innerHeight } = window
    const cameraPosition = new Vector3(10, 9, 4)
    const lookAt = new Vector3(10, 9, 0)
    return (
      <perspectiveCamera name='camera'
        position={cameraPosition}
        aspect={innerWidth / innerHeight}
        lookAt={lookAt}
        near={0.1}
        far={1000}
        fov={75}
      />
    )
  }
}
