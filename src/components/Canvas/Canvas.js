import React, { Component } from 'react'
import React3 from 'react-three-renderer'
import { FPSStats } from 'react-stats'

import MainCamera from '@src/components/MainCamera/MainCamera'
import SceneContainer from '@src/components/SceneContainer'
import ResourcesContainer from '@src/components/Resources/ResourcesContainer'

export default class Canvas extends Component {
  render() {
    const { onAnimate } = this.props
    const { allModelsLoaded, allTexturesLoaded } = this.props
    const { innerWidth, innerHeight } = window
    return (
      <div>
        <FPSStats />
        <React3 mainCamera='camera'
          width={innerWidth}
          height={innerHeight}
          onAnimate={onAnimate}
        >
          <ResourcesContainer store={this.props.store} />
          <SceneContainer store={this.props.store} />
        </React3>
      </div>
    )
  }
}
