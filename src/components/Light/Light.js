import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Light extends Component {
  render() {
    const lightPosition_1 = new Vector3(10, 11, 5)
    const lightPosition_2 = new Vector3(10, 10, 5)
    const lightPosition_3 = new Vector3(4, 11, 4)
    return (
      <group>
        <pointLight castShadow={true} key="light1" color='#d7ecfd'
          position={lightPosition_1}
          shadowCameraNear={0.1}
          shadowCameraFar={55}
          intensity={7}
          distance={7}
          decay={3}
        />
        <pointLight key="light2" color='navy'
          position={lightPosition_2}
          intensity={15}
          distance={15}
          decay={10}
        />
        <pointLight key="light3" color='red'
          position={lightPosition_3}
          intensity={35}
          distance={35}
          decay={30}
        />
      </group>
    )
  }
}
