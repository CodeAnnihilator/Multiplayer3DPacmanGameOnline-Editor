import React, { Component } from 'react'
import { Vector3, Vector2, Raycaster } from 'three'

import Ground from '@src/meshes/ground/Ground'
import Wall from '@src/meshes/ground/Wall'
import RolloverMesh from '@src/meshes/rollover/RolloverMesh'
import GridHelper from './GridHelper'

export default class Unsorted extends Component {
  constructor() {
    super()
    this.matrix = new Array(20).fill(null).map(() => new Array(20).fill([]))
    this.raycaster = new Raycaster()
    this.state = {
      mousePosition: new Vector3(),
      matrix: this.matrix,
      tileSize: 50
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    document.addEventListener('mousedown', this.onDocumentMouseDown, false)
    document.addEventListener('keydown', this.onDocumentKeyDown, false)
    document.addEventListener('keyup', this.onDocumentKeyUp, false)
  }

  setRaycasterSettings = (e) => {
    const nextMousePositionX = (e.clientX / window.innerWidth) * 2 - 1
    const nextMousePositionY = -(e.clientY / window.innerHeight) * 2 + 1
    const raycasterMousePosition = new Vector2(nextMousePositionX, nextMousePositionY)
    this.raycaster.setFromCamera(raycasterMousePosition, this.refs.camera)
    return this.raycaster.intersectObjects(this.refs.intersectObjects.children)
  }

  onDocumentMouseMove = e => {
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileFace = intersections[0].face.normal
      const tileX = parseInt(Math.round(tilePosition.x) / this.state.tileSize, 10) * 50 - 475
      const tileY = parseInt(Math.round(tilePosition.y) / this.state.tileSize, 10) * 50 - 475
      const tileZpoint = parseInt(intersections[0].object.position.z, 10)
      const tileZ = parseInt((tileZpoint + 25) / 50, 10) * 50 + 25
      const nextTileX1 = tileFace.x !== 0 ? tileFace.x < 0 ? tileX - 50 : tileX : tileX
      const nextTileY1 = tileFace.y !== 0 ? tileFace.y < 0 ? tileY - 50 : tileY : tileY
      const nextTileZ1 = (tileFace.x === 0 && tileFace.y === 0) ? tileZ : tileZ - 50
      this.setState({ mousePosition: new Vector3(nextTileX1, nextTileY1, nextTileZ1) })
    }
  }

  defineNextMatrix = (cell, x, y, nextTileX1, nextTileY1, tileZ) => {
    const isMatch = (y === nextTileY1 && x === nextTileX1)
    if (!isMatch) return cell
    const nextCellShape = cell.length > tileZ ? cell.length : tileZ + 1
    return new Array(nextCellShape).fill(null).map((tall, z) => {
      return cell[z] ? cell[z] : z === tileZ ? { type: 'test', ground: 1 } : null
    })
  }

  onDocumentMouseDown = e => {
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileFace = intersections[0].face.normal
      const tileX = parseInt(Math.round(tilePosition.x) / this.state.tileSize, 10)
      const tileY = parseInt(Math.round(tilePosition.y) / this.state.tileSize, 10)
      const tileZ = parseInt(Math.round(tilePosition.z) / this.state.tileSize, 10)
      const nextTileX1 = tileFace.x !== 0 ? tileFace.x < 0 ? tileX - 1 : tileX : tileX
      const nextTileY1 = tileFace.y !== 0 ? tileFace.y < 0 ? tileY - 1 : tileY : tileY
      const nextMatrix = this.state.matrix.map((row, y) => row.map((cell, x) => this.defineNextMatrix(cell, x, y, nextTileX1, nextTileY1, tileZ)))
      this.setState({ matrix: nextMatrix })
    }
  }

  render() {
    const { matrix, tileSize } = this.state
    const groundPosition = new Vector3(500, 500, 0)
    const cameraPosition = new Vector3(500, 100, 500)
    const lookAt = new Vector3(500, 460, 0)
    return (
      <group>
        <perspectiveCamera ref='camera' near={1} far={10000} fov={45}
          aspect={window.innerWidth / window.innerHeight}
          position={cameraPosition}
          lookAt={lookAt}
        />
        <group position={groundPosition}>
          <RolloverMesh mousePosition={this.state.mousePosition} />
          <GridHelper length={matrix.length} tileSize={tileSize} />
          <group ref='intersectObjects'>
            {
              matrix.map((row, y) => {
                return row.map((cell, x) => {
                  const tylePositionX = x * tileSize - (matrix.length - 1) * tileSize / 2
                  const tylePositionY = y * tileSize - (matrix.length - 1) * tileSize / 2
                  return cell.map((tall, z) => {
                    if (!tall) return
                    return <Wall positionX={tylePositionX} positionY={tylePositionY} positionZ={z * 50 + 25} ground={tall.ground} />
                  })
                })
              })
            }
            {
              matrix.map((row, y) => {
                return row.map((cell, x) => {
                  const tylePositionX = x * tileSize - (matrix.length - 1) * tileSize / 2
                  const tylePositionY = y * tileSize - (matrix.length - 1) * tileSize / 2
                  return <Ground positionX={tylePositionX} positionY={tylePositionY} ground={0} />
                })
              })
            }
          </group>
        </group>
      </group>
    )
  }
}
