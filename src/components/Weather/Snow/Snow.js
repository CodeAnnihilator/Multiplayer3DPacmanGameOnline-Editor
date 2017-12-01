import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class Snow extends Component {
  constructor(props, context) {
    super(props, context)
  }
  render() {
    const { verticles } = this.props
    return (
      <points position={new Vector3(-500, 0, -500)}>
        <geometry vertices={verticles} />
        <pointsMaterial size={1.4} opacity={0.2} color='white' />
      </points>
    )
  }
}
