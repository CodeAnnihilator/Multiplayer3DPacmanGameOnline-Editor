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
    const lightPosition = new Vector3(this.state.x, this.state.y + 1, 5)
    const lightPosition1 = new Vector3(this.state.x, this.state.y, 5)
    const lightPosition2 = new Vector3(4, 11, 4)
    return (
      <group>
        <pointLight castShadow
          key="light1"
          color='#d7ecfd'
          shadowCameraNear={0.1}
          shadowCameraFar={55}
          position={lightPosition}
          distance={7}
          decay={3}
          intensity={7}
        />
        <pointLight
          key="light2"
          color='navy'
          distance={15}
          decay={10}
          intensity={15}
          position={lightPosition1}
        />
        <pointLight
          key="light3"
          color='red'
          distance={35}
          decay={30}
          intensity={35}
          position={lightPosition2}
        />
        <Camera cameraPositionX={this.state.x} cameraPositionY={this.state.y} />
        <mesh position={position}>
          <sphereGeometry radius={0.2} widthSegments={32} heightSegments={32} />
          <meshBasicMaterial color='gold' />
        </mesh>
      </group>
    )
  }
}

// <pointLight castShadow
//   color='pink'
//   shadowCameraNear={0.1}
//   shadowCameraFar={10}
//   distance={9}
//   decay={20}
//   intensity={15}
//   position={lightPosition1}
// />

// <pointLight castShadow
//   color='#d7ecfd'
//   shadowCameraNear={0.1}
//   shadowCameraFar={1}
//   position={lightPosition}
//   distance={7}
//   decay={3}
//   intensity={7}
// />
