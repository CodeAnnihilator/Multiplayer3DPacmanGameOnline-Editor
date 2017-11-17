import React, { Component } from 'react'
import THREE, { Vector3, Euler } from 'three'
import React3 from 'react-three-renderer'

// import Scene from './Scene'

import { loadModel } from '../utils/loadAsset'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tree: null,
      rotation: 0
    }
  }
  componentDidMount() {
    this.mounted = true
    window.THREE = THREE
    loadModel('./assets/tree11.json')
      .then(geometry => {
        console.log(geometry)
        this.setState({ tree: geometry })
      })
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
    this.setState({ rotation: this.state.rotation + 0.01 })
    this.requestGameLoop()
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight
    const cameraPosition = new Vector3( 0, 5, 40 )
    const lookAt = new Vector3( 0, 0, 0 )
    const { tree } = this.state
    const position = new Vector3(0, 0, 0)
    const scale = new Vector3(0.3, 0.3, 0.3)
    const rotation = new Euler(0, this.state.rotation, 0)
    return (
      <div>
        {
          !tree
            ? 'Loading...'
            : <React3
              mainCamera="camera"
              width={ width }
              height={ height }
              antialias
            >
              <resources>
                <texture
                    resourceId="treeImage"
                    url='./assets/res.png'
                    anisotropy={ 16 }
                />
                <meshPhongMaterial resourceId="treeTexture">
                    <textureResource resourceId="treeImage" />
                </meshPhongMaterial>
                <geometry
                  resourceId="treeGeometry"
                  faces={ tree.faces }
                  vertices={ tree.vertices }
                  faceVertexUvs={ tree.faceVertexUvs }
                />
              </resources>
              <scene>
                <perspectiveCamera
                  name="camera"
                  fov={ 75 }
                  aspect={ width / height }
                  near={ 0.1 }
                  far={ 1000 }
                  position={ cameraPosition }
                  lookAt={ lookAt }
                />
                <ambientLight color={ 0xdddddd } />
                <group>
                  <mesh position={position} rotation={rotation} scale={scale}>
                      <geometryResource resourceId="treeGeometry" />
                      <materialResource resourceId="treeTexture" />
                  </mesh>
                </group>
              </scene>
            </React3>
        }
      </div>
    )
  }
}
