import React, { Component } from 'react'
import { Vector3 } from 'three'
import * as _ from 'lodash'

export default class Cloud extends Component {
  constructor() {
    super()
    this.state = {
      verticles: this.generateVerticles(),
    }
  }
  componentDidMount() {
    this.countdown = setInterval(this.move, 50)
  }

  componentWillUnmount() {
    clearInterval(this.countdown)
  }

  move = () => {
    this.setState({
      verticles: this.state.verticles.map(ver => {
        const verZ = ver.z - 0.01 > 0 ? ver.z - 0.01 : Math.random() * 5
        return new Vector3(ver.x, ver.y, verZ)
      })
    })
  }

  generateVerticles = () => {
    const verticles = []
    _.times(3000, function(n){
      let x = Math.random() * 20
      let y = Math.random() * 20
      let z = Math.random() * 5
      verticles.push(new Vector3(x, y, z))
    })
    return verticles
  }
  render() {
    const renderPosition = new Vector3(10, 10, 1)
    return (
      <points>
        <geometry vertices={this.state.verticles} />
        <pointsMaterial size={0.01} opacity={0.2} color='white' />
      </points>
    )
  }
}


// const { positionX, positionY } = this.props
// const renderPosition = new Vector3(positionX, positionY, 1)
// return (
//   <mesh position={renderPosition}>
//     <geometry width={1} height={1} depth={2} />
//     <pointCloudMaterial color={0xffffcc} />
//   </mesh>
// )
