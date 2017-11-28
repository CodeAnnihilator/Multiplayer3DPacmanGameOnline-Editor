import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Light extends Component {
  constructor() {
    super()
    this.state = {
      dayTime: 1,
      dir: -1
    }
  }
  // componentDidMount() { this.countdown = setInterval(this.move, 20) }
  // move = () => {
  //   if (this.state.dir > 0 && this.state.dayTime < 1) return this.setState({ dayTime: this.state.dayTime + 0.001 })
  //   if (this.state.dir < 0 && this.state.dayTime > 0.1) return this.setState({ dayTime: this.state.dayTime - 0.001 })
  //   if (this.state.dayTime >= 1) return this.setState({ dir: -this.state.dir })
  //   if (this.state.dayTime <= 0.1) return this.setState({ dir: -this.state.dir })
  // }
  render() {
    const dirLightPosition = new Vector3(-10, -10, 10)
    const pointLightPosition = new Vector3(400, 400, 400)
    const dirLightLookAt = new Vector3(0, 0, 0)
    return (
      <group>
        <ambientLight
          intensity={this.state.dayTime * 4}
          color={0x212223}
        />
        <directionalLight color={0xffffff}
          position={dirLightPosition}
          lookAt={dirLightLookAt}
          intensity={this.state.dayTime * 1}
        />
        <pointLight color={0x212223}
          position={pointLightPosition}
          castShadow={true}
          intensity={this.state.dayTime * 2}
        />
        <pointLight color='navy'
          position={pointLightPosition}
          intensity={this.state.dayTime * 2}
        />
      </group>
    )
  }
}

// <pointLight color='orange'
//   position={new Vector3(500, 500, 50)}
//   intensity={12}
//   distance={100}
//   decay={3}
// />
