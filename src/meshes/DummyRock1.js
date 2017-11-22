import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class DummyRock1 extends Component {
  render() {
    const { positionX, positionY } = this.props
    const renderPosition = new Vector3(positionX, positionY, 1)
    return (
      <mesh position={renderPosition}>
        <boxGeometry width={1} height={1} depth={2} />
        <materialResource resourceId='wallTexture' />
      </mesh>
    )
  }
}
