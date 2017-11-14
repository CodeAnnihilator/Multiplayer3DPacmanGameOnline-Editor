import React, { Component } from 'react'
import * as THREE from 'three'

import level1 from './levels/level1'

export default class Level extends Component {
  render() {
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
