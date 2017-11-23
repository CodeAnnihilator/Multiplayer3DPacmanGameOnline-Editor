import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Ground1 extends Component {
  render() {
    const { positionX, positionY } = this.props
    const renderPosition = new Vector3(positionX, positionY, 0)
    return (
      <mesh receiveShadow position={renderPosition}>
        <boxGeometry width={1} height={1} depth={0.01} />
        <materialResource resourceId='tileGhostLandTexture' />
      </mesh>
    )
  }
}
