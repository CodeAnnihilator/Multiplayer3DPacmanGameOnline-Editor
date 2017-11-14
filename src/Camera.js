import React, { Component } from 'react'
import * as THREE from 'three'

export default class Camera extends Component {
  constructor() {
    super()
    this.cameraPosition = new THREE.Vector3(10, 10, 21)
  }
  render() {
    const width = window.innerWidth
    const height = window.innerHeight
    return (
      <perspectiveCamera
        name='camera'
        fov={75}
        aspect={width / height}
        near={0.1}
        far={1000}
        position={this.cameraPosition}
      />
    )
  }
}
