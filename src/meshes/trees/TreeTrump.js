import React, { Component } from 'react'
import THREE, { Vector3, Euler } from 'three'
import Ground from '@src/meshes/ground/Ground'

export default class TreeTrump extends Component {
  constructor() {
    super()
    this.state = {
      scale: 0.008,
      positionX: 0,
      positionY: 0,
      rotationX: 1.5,
      rotationY: 0,
      ground: 0
    }
  }
  componentWillMount() {
    const { positionX, positionY, rotationY, ground } = this.props
    this.setState({ positionX, positionY, rotationY, ground })
  }
  render() {
    const { scale, positionX, positionY, rotationX, rotationY, ground } = this.state
    const renderScale = new Vector3(scale, Math.random() * 0.005 + scale, scale)
    const renderPosition = new Vector3(positionX, positionY, 0)
    const renderRotation = new Euler(rotationX, rotationY, 0)
    return (
      <group>
        <mesh castShadow receiveShadow
          position={renderPosition}
          rotation={renderRotation}
          scale={renderScale}
        >
          <geometryResource resourceId='treeTrumpModel' />
          <meshPhongMaterial shininess={0} color='#352525' />
        </mesh>
        <Ground positionX={positionX} positionY={positionY} ground={ground} />
      </group>
    )
  }
}
