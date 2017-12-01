import React from 'react'
import { Vector3, Euler } from 'three'

const GridHelper = ({ tileSize, length }) => {
  return (
    <gridHelper
      size={length * tileSize}
      step={length}
      colorCenterLine='#1e2934'
      // colorGrid='white'
      colorGrid='#1e2934'
      position={new Vector3(0, 0.1, 0)}
    />
  )
}

export default GridHelper
