import React, { Component } from 'react'
import React3 from 'react-three-renderer'
import { FPSStats } from 'react-stats'
import { PCFSoftShadowMap } from 'three'

import MainCamera from '@src/components/MainCamera/MainCamera'
import SceneContainer from '@src/components/SceneContainer'
import ResourcesContainer from '@src/components/Resources/ResourcesContainer'

export default class Canvas extends Component {
  componentDidMount() {
    const canvas = document.getElementsByTagName('canvas')[0]
    canvas.style.position = 'absolute'
  }
  render() {
    const { onAnimate } = this.props
    const { allModelsLoaded, allTexturesLoaded } = this.props
    const { innerWidth, innerHeight } = window
    return (
      <div>
        <FPSStats />
        <React3 mainCamera='mainCamera'
          shadowMapType={PCFSoftShadowMap}
          width={innerWidth}
          height={innerHeight}
          onAnimate={onAnimate}
          clearColor='black'
          shadowMapEnabled
          antialias
        >
          <ResourcesContainer store={this.props.store} />
          <SceneContainer store={this.props.store} />
        </React3>
      </div>
    )
  }
}
