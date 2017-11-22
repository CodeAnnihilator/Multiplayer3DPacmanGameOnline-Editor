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
      speed: 0.012,
      diffX: 0,
      diffY: 0,
      nextX: this.initialPosition.x,
      nextY: this.initialPosition.y,
      predictX: null,
      predictY: null,
      x: this.initialPosition.x,
      y: this.initialPosition.y,
      z: 0,
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false)
    document.addEventListener("keyup", this.handleKeyUp, false)
    this.countdown = setInterval(this.move, 5)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false)
    document.removeEventListener("keyup", this.handleKeyUp, false)
    clearInterval(this.countdown)
  }

  isNextTileReached = () => {
    const { x, y, nextX, nextY, diffX, diffY } = this.state
    const dirX = diffX > 0 ? 1 : 0
    const dirY = diffY > 0 ? 1 : 0
    const isReachedX = dirX ? x >= nextX : x <= nextX
    const isReachedY = dirY ? y >= nextY : y <= nextY
    return isReachedX && isReachedY
  }

  move = () => {
    const { speed, x, y, diffX, diffY, nextX, nextY, isMoving, predictX, predictY } = this.state
    const nextXpos = x + diffX * speed
    const nextYpos = y + diffY * speed
    const isNextTileReached = this.isNextTileReached()
    if (isMoving && isNextTileReached) {
      const nextDestinationTile = level1[nextY + diffY][nextX + diffX]
      if (nextDestinationTile.groundType === 0) return this.setState({ x: nextXpos, y: nextYpos, isMoving: false })
    }
    if (!isMoving) {
      if (!isNextTileReached) return this.setState({ x: nextXpos, y: nextYpos })
      if (isNextTileReached) {
        if (predictX && predictY) {
          return this.setState({ x: nextX, y: nextY, nextX: predictX, nextY: predictY, predictX: null, predictY: null,
            diffX: predictX - nextX,
            diffY: predictY - nextY
          })
        }
        return this.setState({ x: nextX, y: nextY })
      }
    } else {
      if (!isNextTileReached) this.setState({ x: nextXpos, y: nextYpos })
      if (isNextTileReached) this.setState({ x: nextXpos, y: nextYpos, nextX: nextX + diffX, nextY: nextY + diffY })
    }
  }

  checkDestination = (nextX, nextY) => {
    const destinationTile = level1[nextY][nextX]
    if (destinationTile.groundType === 0) return
    const diffX = nextX - this.state.nextX
    const diffY = nextY - this.state.nextY
    const isNextTileReached = this.isNextTileReached()
    if (!this.state.isMoving && !isNextTileReached) {
      return this.setState({ predictX: nextX, predictY: nextY })
      // if ((diffX !== 0 && nextY !== 0) || (diffY !== 0 && nextX !== 0)) {
      //   console.log(nextY)
      //   if (diffX === 0) return this.setState({ diffX, nextX, predictX: nextX, predictY: nextY })
      //   return this.setState({ predictX: nextX, predictY: nextY })
      // }
    }
    this.setState({ diffX, diffY, nextX, nextY, isMoving: true })
  }

  handleKeyPress = e => {
    if (this.state.isMoving) return
    if (e.keyCode === 37) this.checkDestination(this.state.nextX - 1, this.state.nextY)
    if (e.keyCode === 39) this.checkDestination(this.state.nextX + 1, this.state.nextY)
    if (e.keyCode === 38) this.checkDestination(this.state.nextX, this.state.nextY + 1)
    if (e.keyCode === 40) this.checkDestination(this.state.nextX, this.state.nextY - 1)
  }

  handleKeyUp = e => {
    this.setState({ isMoving: false })
  }

  render() {
    const position = new Vector3(this.state.x, this.state.y, 0)
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

// constructor() {
//   super()
//   this.initialPosition = level1.reduce((c, n, y) => (n.reduce((c1, n1, x) => n1.groundType === 5 ? c = { x, y } : ''), c), {})
//   this.state = {
//     isMoving: false,
//     dX: 0,
//     dY: 0,
//     x: this.initialPosition.x,
//     y: this.initialPosition.y,
//     z: 0,
//   }
// }

// timer = () => {
//   if (this.state.isMoving) {
//     const isReachedDX = parseFloat((this.state.dX - this.state.x).toFixed(10)) === 0
//     const isReachedDY = parseFloat((this.state.dY - this.state.y).toFixed(10)) === 0
//     if (isReachedDX && isReachedDY) {
//       console.log(this.state.x)
//       console.log(this.state.dX)
//       return this.setState({
//         isMoving: false,
//         x: this.state.dX,
//         y: this.state.dY
//       })
//     } else {
//       const x1 = this.state.dX - this.state.x
//       const y1 = this.state.dY - this.state.y
//       return this.setState({
//         x: !isReachedDX ? x1 > 0 ? this.state.x + 0.005 : this.state.x - 0.005 : this.state.dX,
//         y: !isReachedDY ? y1 > 0 ? this.state.y + 0.005 : this.state.y - 0.005 : this.state.dY
//       })
//     }
//   }
// }
//
// setNewPosition = (x, y) => {
//   if (this.state.isMoving) return
//   const destinationTile = level1[y][x]
//   if (destinationTile.groundType === 0) return
//   this.setState({ dX: x, dY: y, isMoving: true })
// }

// handleKeyPress = e => {
//   if (e.keyCode === 37) this.setNewPosition(this.state.x - 1, this.state.y)
//   if (e.keyCode === 39) this.setNewPosition(this.state.x + 1, this.state.y)
//   if (e.keyCode === 38) this.setNewPosition(this.state.x, this.state.y + 1)
//   if (e.keyCode === 40) this.setNewPosition(this.state.x, this.state.y - 1)
// }
