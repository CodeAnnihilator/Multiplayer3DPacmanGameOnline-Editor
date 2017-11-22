import React, { PureComponent } from 'react'
import THREE, { Vector3, Euler } from 'three'

import level1 from './levels/level1'

import Tree1 from './meshes/Tree1'
import Ground1 from './meshes/Ground1'
import DummyRock1 from './meshes/DummyRock1'

export default class Level extends PureComponent {
  render() {
    return (
      <group>
        {
          level1.map((row, y) => {
            return row.map((cell, x) => {
              const position = new Vector3(x, y, 0)
              if (cell.groundType === 0) {
                if (cell.assetType === 1) return <DummyRock1 positionX={x} positionY={y} />
                if (cell.assetType === 2) return <Tree1 positionX={x} positionY={y} rotationY={cell.rotationX} />
              }
              return <Ground1 positionX={x} positionY={y} />
            })
          })
        }
      </group>
    )
  }
}
