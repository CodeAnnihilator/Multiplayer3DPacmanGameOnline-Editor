import React, { Component } from 'react'
import { Vector3, Vector2, Raycaster, PerspectiveCamera, Mesh, PlaneBufferGeometry, MeshBasicMaterial, Euler } from 'three'

import MainCamera from '@src/components/MainCamera/MainCamera'
import Ground from '@src/meshes/ground/Ground'
import RolloverMesh from '@src/meshes/rollover/RolloverMesh'

const textureTypes = [
  'forestGround'
]

export default class Unsorted extends Component {
  constructor() {
    super()
    this.matrix = new Array(20).fill(null).map(() => new Array(20).fill(null))
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

  onDocumentMouseMove = e => {
    const nextMousePositionX = (e.clientX / window.innerWidth) * 2 - 1
    const nextMousePositionY = -(e.clientY / window.innerHeight) * 2 + 1
    const raycasterMousePosition = new Vector2(nextMousePositionX, nextMousePositionY)
    this.state.raycaster.setFromCamera(raycasterMousePosition, this.refs.camera)
    const intersections = this.state.raycaster.intersectObjects(this.refs.intersectObjects.children)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileX = parseInt(tilePosition.x / this.state.tileSize, 10) * this.state.tileSize - 500 + 25
      const tileY = parseInt(tilePosition.y / this.state.tileSize, 10) * this.state.tileSize - 500 + 25
      const tyleZpoint = parseInt(intersections[0].object.position.z, 10)
      const tileZ = parseInt((tyleZpoint + 25) / 50, 10) * 50 + 25
      this.setState({ mousePosition: new Vector3(tileX, tileY, tileZ) })
    }
  }

  onDocumentMouseDown = e => {
    const nextMousePositionX = (e.clientX / window.innerWidth) * 2 - 1
    const nextMousePositionY = -(e.clientY / window.innerHeight) * 2 + 1
    this.state.mousePosition.set(nextMousePositionX, nextMousePositionY)
    this.state.raycaster.setFromCamera(this.state.mousePosition, this.refs.camera)
    const intersections = this.state.raycaster.intersectObjects(this.refs.intersectObjects.children)
    if (intersections.length > 0) {
      const tilePosition = intersections[0].point
      const tileX = parseInt(tilePosition.x / this.state.tileSize, 10)
      const tileY = parseInt(tilePosition.y / this.state.tileSize, 10)
      const tileZ = parseInt(tilePosition.z / this.state.tileSize, 10)
      const nextMatrix = this.state.matrix.map((row, y) => {
        return row.map((cell, x) => {
          if (x === tileX && y === tileY) return { type: 'test1', ground: 0 }
          return cell
        })
      })
      this.setState({ matrix: nextMatrix })
    }
  }

  render() {
    const planeRotation = new Euler(-Math.PI / 2, 0, 0)
    const groundPosition = new Vector3(500, 500, 0)
    const { innerWidth, innerHeight } = window
    const { matrix, tileSize } = this.state
    const cameraPosition = new Vector3(500, 100, 500)
    const lookAt = new Vector3(500, 460, 0)
    return (
      <group>
        <perspectiveCamera ref='camera' near={1} far={10000} fov={45}
          aspect={innerWidth / innerHeight}
          position={cameraPosition}
          lookAt={lookAt}
        />
        <group position={groundPosition}>
          <RolloverMesh mousePosition={this.state.mousePosition} />
          <group ref='intersectObjects'>
            {
              matrix.map((row, y) => {
                return row.map((cell, x) => {
                  const tylePositionX = x * tileSize - (matrix.length - 1) * tileSize / 2
                  const tylePositionY = y * tileSize - (matrix.length - 1) * tileSize / 2
                  if (!cell) {
                    return (
                      <mesh position={new Vector3(tylePositionX, tylePositionY, 0.01)}>
                        <boxGeometry width={50} height={50} depth={0} />
                        <materialResource resourceId={`${textureTypes[0]}Texture`} />
                      </mesh>
                    )
                  }
                  if (cell.type === 'test') {
                    return (
                      <mesh position={new Vector3(tylePositionX, tylePositionY, 25)}>
                        <boxGeometry width={50} height={50} depth={50} />
                        <materialResource resourceId={`${textureTypes[cell.ground]}Texture`} />
                      </mesh>
                    )
                  }
                  if (cell.type === 'test1') return <Ground positionX={tylePositionX} positionY={tylePositionY} ground={0} />
                })
              })
            }
          </group>
          <gridHelper
            rotation={planeRotation}
            size={matrix.length * tileSize}
            step={matrix.length}
            colorCenterLine='#1e2934'
            colorGrid='#1e2934'
            position={new Vector3(0, 0, 0.1)}
          />
        </group>
      </group>
    )
  }
}
