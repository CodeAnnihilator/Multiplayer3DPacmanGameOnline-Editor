import React, { Component } from 'react'
import { Vector3, Euler }  from 'three'
import OrbitControls from 'three-orbitcontrols'

export default class Camera extends Component {
  componentDidMount() {
    const canvas = document.getElementsByTagName('canvas')[0]
    const controls = new OrbitControls(this.refs.camera, canvas)
    this.refs.camera.position.set(500, 500, 200)
    controls.target = new Vector3(0, 0, 0)
    controls.maxPolarAngle = Math.PI / 3
    controls.minDistance = 400
    controls.maxDistance = 900
    controls.keyPanSpeed = 20
    controls.update()
    // controls.addEventListener( 'change', e => console.log(e) )
  }
  onDocumentWheel = e => this.props.updateCameraRemoteness(e.deltaY)
  render() {
    const { innerWidth, innerHeight } = window
    const { name, position, lookAt } = this.props
    return (
      <perspectiveCamera ref='camera' name={name}
        aspect={innerWidth / innerHeight}
        near={1}
        far={1500}
        fov={45}
      />
    )
  }
}
