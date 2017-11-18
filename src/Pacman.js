import React, { Component } from 'react'
import { Vector3 } from 'three'

import level1 from './levels/level1'
import Camera from './Camera'

export default class Pacman extends Component {
  constructor() {
    super()
    this.initialPosition = level1.reduce((c, n, y) => (n.reduce((c1, n1, x) => n1.groundType === 5 ? c = { x, y } : ''), c), {})
    this.state = {
      isMoving: false,
      dX: 0,
      dY: 0,
      x: this.initialPosition.x,
      y: this.initialPosition.y,
      z: 0,
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false)
    this.countdown = setInterval(this.timer, 5)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false)
  }

  timer = () => {
    if (this.state.isMoving) {
      if (this.state.x === this.state.dX && this.state.y === this.state.dY) {
        return this.setState({ isMoving: false })
      } else {
        return this.setState({
          x: this.state.x + (this.state.dX - this.state.x) * 0.1,
          y: this.state.y + (this.state.dY - this.state.y) * 0.1
        })
      }
    }
  }

  setNewPosition = (x, y) => {
    if (this.state.isMoving) return
    const destinationTile = level1[y][x]
    if (destinationTile.groundType === 0) return
    this.setState({ dX: x, dY: y, isMoving: true })
  }

  handleKeyPress = e => {
    if (e.keyCode === 37) this.setNewPosition(this.state.x - 1, this.state.y)
    if (e.keyCode === 39) this.setNewPosition(this.state.x + 1, this.state.y)
    if (e.keyCode === 38) this.setNewPosition(this.state.x, this.state.y + 1)
    if (e.keyCode === 40) this.setNewPosition(this.state.x, this.state.y - 1)
  }

  render() {
    const position = new Vector3(this.state.x, this.state.y, 0)
    console.log(this.state.x)
    return (
      <group>
        <Camera cameraPositionX={this.state.x} cameraPositionY={this.state.y} />
        <mesh position={position}>
          <sphereGeometry radius={0.2} widthSegments={32} heightSegments={32} />
          <meshBasicMaterial color='gold' />
        </mesh>
      </group>
    )
  }
}
