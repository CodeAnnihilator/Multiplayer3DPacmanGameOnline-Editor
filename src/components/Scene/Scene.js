import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'

import SceneWrapper from './SceneWrapper'

import Camera from '@src/components/Camera/Camera'
import Light from '@src/components/Light/Light'
import Perspective from '@src/components/Perspective/Perspective'

import SnowContainer from '@src/components/Weather/Snow/SnowContainer'
// import LevelContainer from '@src/components/Level/LevelContainer'

export default class Scene extends Component {
  render() {
    const {
      isAllModelsLoaded,
      isAllTexturesLoaded
    } = this.props
    const shouldRender = isAllModelsLoaded && isAllTexturesLoaded
    return (
      <SceneWrapper store={this.props.store}>
        <Camera name='mainCamera' />
        { shouldRender && <Perspective /> }
        <Light />
      </SceneWrapper>
    )
  }
}
