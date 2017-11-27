import React, { Component } from 'react'
import { Vector3, Vector2, Raycaster, PerspectiveCamera, Mesh, PlaneBufferGeometry, MeshBasicMaterial, Euler } from 'three'

import Ground from '@src/meshes/ground/Ground'
import Wall from '@src/meshes/ground/Wall'
import RolloverMesh from '@src/meshes/rollover/RolloverMesh'
import GridHelper from './GridHelper'

const textureTypes = [
  'forestGround',
  'stoneWall'
]

export default class Unsorted extends Component {
  constructor() {
    super()
    this.matrix = new Array(20).fill(null).map(() => new Array(20).fill([]))
    this.step = 20
    this.state = {
      mousePosition: new Vector3(),
      raycaster: new Raycaster(),
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
    this.state.raycaster.setFromCamera(raycasterMousePosition, this.refs.camera)
    return this.state.raycaster.intersectObjects(this.refs.intersectObjects.children)
  }

  onDocumentMouseMove = e => {
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileX = parseInt(tilePosition.x / this.state.tileSize, 10) * this.state.tileSize - 500 + 25
      const tileY = parseInt(tilePosition.y / this.state.tileSize, 10) * this.state.tileSize - 500 + 25
      const tileZpoint = parseInt(intersections[0].object.position.z, 10)
      const tileZ = parseInt((tileZpoint + 25) / 50, 10) * 50 + 25
      this.setState({ mousePosition: new Vector3(tileX, tileY, tileZ) })
    }
  }

  onDocumentMouseDown = e => {
    const intersections = this.setRaycasterSettings(e)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileX = parseInt(tilePosition.x / this.state.tileSize, 10)
      const tileY = parseInt(tilePosition.y / this.state.tileSize, 10)
      const nextMatrix = this.state.matrix
        .map((row, y) => {
          return row.map((cell, x) => {
            if (x === tileX && y === tileY) return cell.concat({ type: 'test', ground: 1 })
            return cell
          })
        })
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
                  if (!cell.length) return <Ground positionX={tylePositionX} positionY={tylePositionY} ground={0} />
                  return cell.map((tall, z) => {
                    return <Wall positionX={tylePositionX} positionY={tylePositionY} positionZ={z * 50 + 25} ground={tall.ground} />
                  })
                })
              })
            }
          </group>
        </group>
      </group>
    )
  }
}
