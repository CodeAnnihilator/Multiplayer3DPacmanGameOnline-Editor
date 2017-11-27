import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Light extends Component {
  render() {
    const dirLightPosition = new Vector3(1, 0.75, 0.5)
    return (
      <group>
        <ambientLight color={0x606060} />
        <directionalLight color={0xffffff} position={dirLightPosition} />
      </group>
    )
  }
}
