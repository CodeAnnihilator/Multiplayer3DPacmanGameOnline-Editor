import React, { Component } from 'react'
import THREE, { Vector3, Euler, PCFSoftShadowMap } from 'three'

import { loadModel, loadTexture } from '@src/../utils/loadAsset'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      firTree: null,
    }
  }

  componentDidMount() {
    Promise.resolve()
      .then(() => {
        return Promise.all([
          loadModel('../../assets/firTreeModel.json').then(geometry => this.setState({ firTree: geometry }))
        ]).then(() => this.props.allModelsHaveBeenLoaded())
      })
      .then(() => {
        return Promise.all([
          loadTexture('../../assets/firTreeImage.jpg')
        ]).then(() => this.props.allTexturesHaveBeenLoaded())
      })
  }

  render() {
    const { firTree } = this.state
    const { allModelsHaveBeenLoaded, allTexturesHaveBeenLoaded } = this.props
    const { isAllModelsLoaded, isAllTexturesLoaded } = this.props
    const shoudRender = isAllModelsLoaded && isAllTexturesLoaded
    return !shoudRender ? <resources /> : (
      <resources>
        <texture resourceId='firTreeImage' url='./assets/firTreeImage.jpg' anisotropy={ 16 } />
        <meshPhongMaterial shininess={0} resourceId='firTreeTexture'>
          <textureResource resourceId='firTreeImage' />
        </meshPhongMaterial>

        <geometry resourceId='firTreeModel'
          faceVertexUvs={ firTree.faceVertexUvs }
          vertices={ firTree.vertices }
          faces={ firTree.faces }
        />
      </resources>
    )
  }
}
