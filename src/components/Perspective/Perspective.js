import React, { Component } from 'react'
import { Vector3, Vector2, Raycaster, Euler } from 'three'

import CameraContainer from '@src/components/Camera/CameraContainer'

import Rollover from './helpers/Rollover'
import GroundGrid from './helpers/GroundGrid'

import Ground from '@src/components/Meshes/Ground/Ground'
import Wall from '@src/components/Meshes/Ground/Wall'

export default class Perspective extends Component {
  constructor() {
    super()
    this.matrix = new Array(20).fill(null).map(() => new Array(20).fill([]))
    this.raycaster = new Raycaster()
    this.state = {
      mousePosition: new Vector3(0, 25, 0),
      matrix: this.matrix,
      tileSize: 50,
      isPlacingBlock: false
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    document.addEventListener('mousedown', this.onDocumentMouseDown, false)
    document.addEventListener('keypress', this.onDocumentKeyPress, false)
    this.camera = this.refs.perspectiveView.children.find(child => child.name === 'raycasterCamera')
  }

  setRaycasterSettings = e => {
    const nextMousePositionX = (e.clientX / window.innerWidth) * 2 - 1
    const nextMousePositionY = -(e.clientY / window.innerHeight) * 2 + 1
    const raycasterMousePosition = new Vector2(nextMousePositionX, nextMousePositionY)
    this.raycaster.setFromCamera(raycasterMousePosition, this.camera)
    return this.raycaster.intersectObjects(this.refs.intersectObjects.children)
  }

  defineNextMatrix = (cell, x, z, tileX, tileZ, tileY) => {
    const isMatch = (x === tileX && z === tileZ)
    if (!isMatch) return cell
    const nextCellShape = cell.length > tileY ? cell.length : tileY + 1
    return new Array(nextCellShape).fill(null).map((tall, y) => {
      return cell[y] ? cell[y] : y === tileY ? { type: 'test', ground: 1 } : null
    })
  }

  onDocumentKeyPress = e => {
    if (e.keyCode === 102) this.setState({ isPlacingBlock: !this.state.isPlacingBlock })
  }

  onDocumentMouseMove = e => {
    const { tileSize, matrix, isPlacingBlock } = this.state
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileFace = intersections[0].face.normal
      const faceOffsetX = tileFace.x >= 0 ? 0 : -1
      const faceOffsetZ = tileFace.z >= 0 ? 0 : -1
      const faceOffsetY = tileFace.y >= 0 ? 0 : -1
      const tileX = (Math.floor(Math.ceil(tilePosition.x) / tileSize) + faceOffsetX) * 50 + 25
      const tileZ = (Math.floor(Math.ceil(tilePosition.z) / tileSize) + faceOffsetZ) * 50 + 25
      const tileY = Math.floor(Math.ceil(tilePosition.y) / tileSize) * 50 + 25
      this.setState({ mousePosition: new Vector3(tileX, tileY, tileZ) })
    }
  }

  onDocumentMouseDown = e => {
    if (e.button === 2) return
    const { tileSize, matrix, isPlacingBlock } = this.state
    if (!isPlacingBlock) return
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileFace = intersections[0].face.normal
      const mapCenterTiles = matrix.length / 2
      const faceOffsetX = tileFace.x >= 0 ? 0 : -1
      const faceOffsetZ = tileFace.z >= 0 ? 0 : -1
      const faceOffsetY = tileFace.y >= 0 ? 0 : -1
      const tileX = Math.floor(Math.ceil(tilePosition.x) / tileSize + mapCenterTiles) + faceOffsetX
      const tileZ = Math.floor(Math.ceil(tilePosition.z) / tileSize + mapCenterTiles) + faceOffsetZ
      const tileY = Math.floor(Math.ceil(tilePosition.y) / tileSize) + faceOffsetY
      const tileMouseX = (Math.floor(Math.ceil(tilePosition.x) / tileSize) + faceOffsetX) * 50 + 25
      const tileMouseZ = (Math.floor(Math.ceil(tilePosition.z) / tileSize) + faceOffsetZ) * 50 + 25
      const tileMouseY = Math.floor(Math.ceil(tilePosition.y) / tileSize) * 50 + 25
      const nextMatrix = matrix.map((row, x) => row.map((cell, z) => this.defineNextMatrix(cell, x, z, tileX, tileZ, tileY)))
      this.setState({
        matrix: nextMatrix,
        mousePosition: new Vector3(tileMouseX, tileMouseY, tileMouseZ)
      })
    }
  }

  render() {
    const { matrix, tileSize, mousePosition, isPlacingBlock } = this.state
    const { store } = this.props
    return (
      <group ref='perspectiveView'>
        <CameraContainer store={store} name='raycasterCamera' />
        <group>
          { isPlacingBlock && <Rollover mousePosition={mousePosition} /> }
          <GroundGrid length={matrix.length} tileSize={tileSize} />
          <group ref='intersectObjects'>
            {
              matrix.map((row, x) => {
                return row.map((cell, z) => {
                  const tylePositionX = x * tileSize - matrix.length * tileSize / 2 + 25
                  const tylePositionZ = z * tileSize - matrix.length * tileSize / 2 + 25
                  return cell.map((tall, y) => {
                    if (!tall) return
                    return <Wall positionX={tylePositionX} positionY={y * 50 + 25} positionZ={tylePositionZ} ground={tall.ground} />
                  })
                })
              })
            }
            {
              matrix.map((row, x) => {
                return row.map((cell, z) => {
                  const tylePositionX = x * tileSize - matrix.length * tileSize / 2 + 25
                  const tylePositionZ = z * tileSize - matrix.length * tileSize / 2 + 25
                  return <Ground positionX={tylePositionX} positionZ={tylePositionZ} ground={0} />
                })
              })
            }
          </group>
        </group>
      </group>
    )
  }
}
