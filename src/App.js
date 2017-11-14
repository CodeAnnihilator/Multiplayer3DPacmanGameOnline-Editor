import React, { Component } from 'react'
import React3 from 'react-three-renderer'
import * as THREE from 'three'

import Level from './Level'
import Camera from './Camera'
import Pacman from './Pacman'

export default class App extends Component {
  constructor() {
    super()
    this._onAnimate = () => {}
    this.state = {
      newDirection: null
    }
  }

  componentDidMount() { document.addEventListener("keydown", this.handleKeyPress, false) }
  componentWillUnmount() { document.removeEventListener("keydown", this.handleKeyPress, false) }
  handleKeyPress = e => this.setState({ newDirection: e.keyCode })

  render() {
    return (
      <React3
        mainCamera='camera'
        width={window.innerWidth - 20}
        height={window.innerHeight - 20}
        onAnimate={this._onAnimate}
      >
        <scene>
          <Camera />
          <Level />
          <Pacman newDirection={this.state.newDirection} />
        </scene>
      </React3>
    )
  }
}
