import React, { Component } from 'react'
import THREE, { Vector3, Euler, PCFSoftShadowMap } from 'three'
import React3 from 'react-three-renderer'
import { FPSStats } from 'react-stats'

import Level from './Level'
import Pacman from './Pacman'
import Cloud from './Cloud'

import { loadModel, loadTexture } from '../utils/loadAsset'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tree: null,
      treeTrump: null,
      pacman: null,
      treeTexture: null,
      groundTexture: null,
      groundTexture1: null,
      wallTexture: null,
      tileGhostLand: null,
    }
  }
  componentDidMount() {
    this.mounted = true
    window.THREE = THREE
    loadModel('./assets/tree2-1.json').then(geometry => this.setState({ tree: geometry }))
    loadModel('./assets/tree-trump.json').then(geometry => this.setState({ treeTrump: geometry }))
    loadModel('./assets/pacman.json').then(geometry => this.setState({ pacman: geometry }))
    loadTexture('./assets/tree2-1.jpg').then(texture => this.setState({ treeTexture: texture }))
    loadTexture('./assets/tile.jpg').then(texture => this.setState({ groundTexture: texture }))
    loadTexture('./assets/groundTexture.jpg').then(texture => this.setState({ groundTexture1: texture }))
    loadTexture('./assets/wallTexture.jpg').then(texture => this.setState({ wallTexture: texture }))
    loadTexture('./assets/tileGhostLand.jpg').then(texture => this.setState({ tileGhostLand: texture }))
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

  _onAnimate = () => {
    
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight - 4
    const { tree, treeTexture, groundTexture, treeTrump, pacman } = this.state
    return (
      <div>
        { /* <FPSStats /> */ }
        {
          (!tree || !treeTexture || !groundTexture || !treeTrump || !pacman)
            ? 'Loading...'
            : (
              <React3
                onAnimate={this._onAnimate}
                shadowMapType={PCFSoftShadowMap}
                shadowMapEnabled
                mainCamera="camera"
                width={ width }
                height={ height }
                antialias
              >
                <resources>
                  <texture resourceId="groundImage" url='./assets/tile.jpg' anisotropy={ 16 } />
                  <texture resourceId="groundImage1" url='./assets/groundTexture.jpg' anisotropy={ 16 } />
                  <texture resourceId="wallImage" url='./assets/wallTexture.jpg' anisotropy={ 16 } />
                  <texture resourceId="treeImage" url='./assets/tree2-1.jpg' anisotropy={ 16 } />
                  <texture resourceId="tileGhostLandImage" url='./assets/tileGhostLand.jpg' anisotropy={ 16 } />
                  <meshPhongMaterial shininess={0} resourceId="groundTexture"><textureResource resourceId="groundImage" /></meshPhongMaterial>
                  <meshPhongMaterial shininess={0} resourceId="groundTexture1"><textureResource resourceId="groundImage1" /></meshPhongMaterial>
                  <meshPhongMaterial resourceId="wallTexture"><textureResource resourceId="wallImage" /></meshPhongMaterial>
                  <meshPhongMaterial shininess={0} resourceId="treeTexture"><textureResource resourceId="treeImage" /></meshPhongMaterial>
                  <meshPhongMaterial shininess={0} resourceId="tileGhostLandTexture"><textureResource resourceId="tileGhostLandImage" /></meshPhongMaterial>
                  <geometry resourceId="treeGeometry" faces={ tree.faces } vertices={ tree.vertices } faceVertexUvs={ tree.faceVertexUvs } />
                  <geometry resourceId="treeTrumpGeometry" faces={ treeTrump.faces } vertices={ treeTrump.vertices } faceVertexUvs={ treeTrump.faceVertexUvs } />
                  <geometry resourceId="pacmanGeometry" faces={ pacman.faces } vertices={ pacman.vertices } />
                </resources>
                <scene>
                  <Cloud />
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
