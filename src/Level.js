import React, { Component } from 'react'
import * as THREE from 'three'

import level1 from './levels/level1'

export default class Level extends Component {
  constructor() {
    super()
    this.state = {
      tree: null
    }
  }
  componentWillMount() {
    const loader = new THREE.JSONLoader ()
    loader.load('./assets/tree.js', tree => {
      // const mesh = new THREE.SkinnedMesh(tree)
      // console.log(mesh)
      // mesh.scale.set(1, 1, 1)
      this.setState({ tree: tree })
    })
  }
  render() {
    const { tree } = this.state
    console.log(tree)
    return (
      <group>
        {
          level1.map((row, y) => {
            return row.map((cell, x) => {
              const position = new THREE.Vector3(x, y, 0)
              return (
                <mesh key={x} position={position}>
                  <boxGeometry width={1} height={1} depth={cell === 0 ? 4 : 0} />
                  <meshBasicMaterial color={cell === 0 ? 'silver' : 'pink'} />
                </mesh>
              )
            })
          })
        }
      </group>
    )
  }
}

// <mesh key={x} position={position}>
//   <boxGeometry width={1} height={1} depth={cell === 0 ? 4 : 0} />
//   <meshBasicMaterial color={cell === 0 ? 'silver' : 'pink'} />
// </mesh>
