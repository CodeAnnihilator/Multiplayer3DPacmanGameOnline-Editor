import React, { Component } from 'react'
import { Vector3 } from 'three'

const textureTypes = [
  'forestGround'
]

export default class Ground extends Component {
  constructor() {
    super()
    this.state = {
      positionX: 0,
      positionY: 0,
      ground: 0
    }
  }
  componentWillMount() {
    const { positionX, positionY, ground } = this.props
    this.setState({ positionX, positionY, ground })
  }
  render() {
    const { positionX, positionY, ground } = this.state
    const renderPosition = new Vector3(positionX, positionY, 0)
    return (
      <mesh receiveShadow position={renderPosition}>
        <boxGeometry width={1} height={1} depth={0.01} />
        <materialResource resourceId={`${textureTypes[ground]}Texture`} />
      </mesh>
    )
  }
}
