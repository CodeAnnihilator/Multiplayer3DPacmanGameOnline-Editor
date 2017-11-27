import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Light extends Component {
  constructor() {
    super()
    this.state = {
      dayTime: 1
    }
  }
  // componentDidMount() { this.countdown = setInterval(this.move, 100) }
  // move = () => this.setState({ dayTime: this.state.dayTime < 0.1 ? 0.1 : this.state.dayTime - 0.01 })
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
        <pointLight color='orange'
          position={new Vector3(500, 500, 50)}
          intensity={10}
          distance={100}
          decay={3}
        />
      </group>
    )
  }
}


// <ambientLight key="light0" color={0x212223} />
// <directionalLight key="light1" castShadow={true}
//   position={position}
//   lookAt={lookAt}
//   color={0xffffff}
//   intensity={0}
// />
// <pointLight castShadow={true} key="light2" color='navy'
//   position={lightPosition_2}
//   intensity={20}
//   distance={500}
//   decay={4}
// />
