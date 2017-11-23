import React, { Component } from 'react'
import THREE, { Vector3, Euler, PCFSoftShadowMap } from 'three'
import React3 from 'react-three-renderer'

import Level from './Level'
import Pacman from './Pacman'

import { loadModel, loadTexture } from '../utils/loadAsset'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tree: null,
      treeTexture: null,
      groundTexture: null,
      groundTexture1: null,
      wallTexture: null,
    }
  }
  componentDidMount() {
    this.mounted = true
    window.THREE = THREE
    loadModel('./assets/tree2-1.json').then(geometry => this.setState({ tree: geometry }))
    loadTexture('./assets/tree2-1.jpg').then(texture => this.setState({ treeTexture: texture }))
    loadTexture('./assets/tile.jpg').then(texture => this.setState({ groundTexture: texture }))
    loadTexture('./assets/groundTexture.jpg').then(texture => this.setState({ groundTexture1: texture }))
    loadTexture('./assets/wallTexture.jpg').then(texture => this.setState({ wallTexture: texture }))
    this.requestGameLoop()
  }
  componentWillUnmount() {
    this.mounted = false
    this.cancelGameLoop()
  }

  requestGameLoop = () => this.reqAnimId = window.requestAnimationFrame(this.gameLoop)
  cancelGameLoopGameLoop = () => window.cancelAnimationFrame(this.reqAnimId)

  gameLoop = time => {
    if (!this.mounted) return
    this.requestGameLoop()
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight - 4
    const { tree, treeTexture, groundTexture } = this.state
    return (
      <div>
        {
          (!tree || !treeTexture || !groundTexture)
            ? 'Loading...'
            : (
              <React3 shadowMapType={PCFSoftShadowMap} shadowMapEnabled mainCamera="camera" width={ width } height={ height } antialias>
                <resources>
                  <texture resourceId="groundImage" url='./assets/tile.jpg' anisotropy={ 16 } />
                  <texture resourceId="groundImage1" url='./assets/groundTexture.jpg' anisotropy={ 16 } />
                  <texture resourceId="wallImage" url='./assets/wallTexture.jpg' anisotropy={ 16 } />
                  <texture resourceId="treeImage" url='./assets/tree2-1.jpg' anisotropy={ 16 } />
                  <meshPhongMaterial resourceId="groundTexture"><textureResource resourceId="groundImage" /></meshPhongMaterial>
                  <meshPhongMaterial resourceId="groundTexture1"><textureResource resourceId="groundImage1" /></meshPhongMaterial>
                  <meshPhongMaterial resourceId="wallTexture"><textureResource resourceId="wallImage" /></meshPhongMaterial>
                  <meshPhongMaterial resourceId="treeTexture"><textureResource resourceId="treeImage" /></meshPhongMaterial>
                  <geometry resourceId="treeGeometry" faces={ tree.faces } vertices={ tree.vertices } faceVertexUvs={ tree.faceVertexUvs } />
                </resources>
                <scene>
                  <Level />
                  <Pacman />
                </scene>
              </React3>
            )
        }
      </div>
    )
  }
}
