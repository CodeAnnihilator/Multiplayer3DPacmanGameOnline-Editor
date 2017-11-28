import React, { Component } from 'react'
import { loadModel, loadTexture } from './utils/loadAsset'

export default class Resources extends Component {
  constructor() {
    super()
    this.state = {
      firTree: null,
      treeTrumpModel: null
    }
  }

  componentDidMount() {
    Promise.resolve()
      .then(() => {
        return Promise.all([
          loadModel('assets/firTree/firTreeModel.json').then(geometry => this.setState({ firTree: geometry })),
          loadModel('assets/treeTrump/treeTrumpModel.json').then(geometry => this.setState({ treeTrumpModel: geometry }))
        ]).then(() => this.props.allModelsHaveBeenLoaded())
      })
      .then(() => {
        return Promise.all([
          loadTexture('assets/firTree/firTreeImage.jpg'),
          loadTexture('assets/ground/forestGroundImage.jpg'),
          loadTexture('assets/ground/stoneWallImage.jpg'),
        ]).then(() => this.props.allTexturesHaveBeenLoaded())
      })
  }

  render() {
    const { firTree, treeTrumpModel } = this.state
    const { isAllModelsLoaded, isAllTexturesLoaded } = this.props
    const shoudRender = isAllModelsLoaded && isAllTexturesLoaded
    return !shoudRender ? <resources /> : (
      <resources>
        <texture resourceId='firTreeImage' url={'assets/firTree/firTreeImage.jpg'} anisotropy={ 16 } />
        <texture resourceId='forestGroundImage' url={'assets/ground/forestGroundImage.jpg'} anisotropy={ 16 } />
        <texture resourceId='stoneWallImage' url={'assets/ground/stoneWallImage.jpg'} anisotropy={ 16 } />
        <meshPhongMaterial shininess={0} resourceId='firTreeTexture'>
          <textureResource resourceId='firTreeImage' />
        </meshPhongMaterial>
        <meshPhongMaterial shininess={0} resourceId='forestGroundTexture'>
          <textureResource resourceId='forestGroundImage' />
        </meshPhongMaterial>
        <meshPhongMaterial shininess={0} resourceId='stoneWallTexture'>
          <textureResource resourceId='stoneWallImage' />
        </meshPhongMaterial>

        <geometry resourceId='firTreeModel'
          faceVertexUvs={firTree.faceVertexUvs}
          vertices={firTree.vertices}
          faces={firTree.faces}
        />
        <geometry resourceId='treeTrumpModel'
          vertices={treeTrumpModel.vertices}
          faces={treeTrumpModel.faces}
        />
      </resources>
    )
  }
}
