import React, { Component } from 'react'
import THREE, { Vector3, Euler } from 'three'
import Ground from '@src/meshes/ground/Ground'

export default class FirTree extends Component {
  constructor() {
    super()
    this.state = {
      scale: 1,
      positionX: 0,
      positionY: 0,
      rotationX: 1.5,
      rotationY: 0
    }
  }
  componentWillMount() {
    const { positionX, positionY, rotationY, ground } = this.props
    this.setState({ positionX, positionY, rotationY, ground })
  }
  render() {
    const { scale, positionX, positionY, rotationX, rotationY } = this.state
    const renderScale = new Vector3(scale, scale, scale)
    const renderPosition = new Vector3(positionX, positionY, 0)
    const renderRotation = new Euler(rotationX, rotationY, 0)
    return (
      <group>
        <mesh receiveShadow position={renderPosition} rotation={renderRotation} scale={renderScale}>
          <geometryResource resourceId='firTreeModel' />
          <materialResource resourceId='firTreeTexture' />
        </mesh>
      </group>
    )
  }
}
