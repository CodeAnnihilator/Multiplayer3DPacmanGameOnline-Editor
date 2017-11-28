import React from 'react'
import { Vector3, Euler } from 'three'

const GridHelper = ({ tileSize, length }) => {
  const planeRotation = new Euler(-Math.PI / 2, 0, 0)
  return (
    <gridHelper
      rotation={planeRotation}
      size={length * tileSize}
      step={length}
      colorCenterLine='#1e2934'
      colorGrid='#1e2934'
      position={new Vector3(0, 0, 0.1)}
    />
  )
}

export default GridHelper
