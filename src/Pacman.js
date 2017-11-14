import React, { Component } from 'react'
import * as THREE from 'three'

import level1 from './levels/level1'

export default class Pacman extends Component {
  constructor() {
    super()
    this.initialPosition = level1.reduce((c, n, y) => (n.reduce((c1, n1, x) => n1 === 5 ? c = { x, y } : ''), c), {})
    this.state = {
      x: this.initialPosition.x,
      y: this.initialPosition.y,
      z: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    const { newDirection } = nextProps
    if (newDirection === 37) this.setState({ x: this.state.x - 1  })
    if (newDirection === 39) this.setState({ x: this.state.x + 1 })
    if (newDirection === 38) this.setState({ y: this.state.y + 1 })
    if (newDirection === 40) this.setState({ y: this.state.y - 1 })
  }
  render() {
    const position = new THREE.Vector3(this.state.x, this.state.y, 0)
    return (
      <mesh position={position}>
        <sphereGeometry radius={0.5} widthSegments={32} heightSegments={32} />
        <meshBasicMaterial color={'red'} />
      </mesh>
    )
  }
}
