import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Vector3 } from 'three'

import SceneWrapper from '@src/components/SceneWrapper'

import MainCamera from '@src/components/MainCamera/MainCamera'
import LevelContainer from '@src/components/Level/LevelContainer'
import Light from '@src/components/Light/Light'
import Unsorted from '@src/components/Unsorted/Unsorted'

export default class Scene extends Component {
  render() {
    const {
      isAllModelsLoaded,
      isAllTexturesLoaded
    } = this.props
    const shouldRender = isAllModelsLoaded && isAllTexturesLoaded
    return (
      <SceneWrapper store={this.props.store}>
        <MainCamera name='mainCamera' />
        { shouldRender && <Unsorted /> }
        <Light />
      </SceneWrapper>
    )
  }
}
