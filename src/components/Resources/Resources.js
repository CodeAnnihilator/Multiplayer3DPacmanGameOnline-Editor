import React, { Component } from 'react'
import { loadModel, loadTexture } from '@src/../utils/loadAsset'

export default class Resources extends Component {
  constructor() {
    super()
    this.assetsPath = 'components/Resources/assets'
    this.state = {
      firTree: null,
      treeTrumpModel: null
    }
  }

  componentDidMount() {
    Promise.resolve()
      .then(() => {
        return Promise.all([
          loadModel(`${this.assetsPath}/firTree/firTreeModel.json`).then(geometry => this.setState({ firTree: geometry })),
          loadModel(`${this.assetsPath}/treeTrump/treeTrumpModel.json`).then(geometry => this.setState({ treeTrumpModel: geometry }))
        ]).then(() => this.props.allModelsHaveBeenLoaded())
      })
      .then(() => {
        return Promise.all([
          loadTexture(`${this.assetsPath}/firTree/firTreeImage.jpg`),
          loadTexture(`${this.assetsPath}/ground/forestGroundImage.jpg`),
          loadTexture(`${this.assetsPath}/ground/stoneWallImage.jpg`),
        ]).then(() => this.props.allTexturesHaveBeenLoaded())
      })
  }

  render() {
    const { firTree, treeTrumpModel } = this.state
    const { isAllModelsLoaded, isAllTexturesLoaded } = this.props
    const shoudRender = isAllModelsLoaded && isAllTexturesLoaded
    return !shoudRender ? <resources /> : (
      <resources>
        <texture resourceId='firTreeImage' url={`${this.assetsPath}/firTree/firTreeImage.jpg`} anisotropy={ 16 } />
        <texture resourceId='forestGroundImage' url={`${this.assetsPath}/ground/forestGroundImage.jpg`} anisotropy={ 16 } />
        <texture resourceId='stoneWallImage' url={`${this.assetsPath}/ground/stoneWallImage.jpg`} anisotropy={ 16 } />
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
