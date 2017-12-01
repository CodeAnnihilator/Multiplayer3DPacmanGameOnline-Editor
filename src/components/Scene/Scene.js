import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'

import SceneWrapper from './SceneWrapper'

import CameraContainer from '@src/components/Camera/CameraContainer'
import SnowContainer from '@src/components/Weather/Snow/SnowContainer'
import Light from '@src/components/Light/Light'
import Perspective from '@src/components/Perspective/Perspective'

export default class Scene extends Component {
  render() {
    const {
      isAllModelsLoaded,
      isAllTexturesLoaded
    } = this.props
    const shouldRender = isAllModelsLoaded && isAllTexturesLoaded
    return (
      <SceneWrapper store={this.props.store}>
        <CameraContainer name='mainCamera' />
        { shouldRender && <Perspective /> }
        { shouldRender && <SnowContainer /> }
        <Light />
      </SceneWrapper>
    )
  }
}
