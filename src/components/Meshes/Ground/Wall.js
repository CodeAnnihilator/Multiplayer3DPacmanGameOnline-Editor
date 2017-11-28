import React from 'react'
import { Vector3 } from 'three'

const textureTypes = [
  'forestGround',
  'stoneWall'
]

const Ground = ({ positionX, positionY, positionZ, ground }) => {
  const renderPosition = new Vector3(positionX, positionY, positionZ)
  return (
    <mesh castShadow receiveShadow position={renderPosition}>
      <boxGeometry width={50} height={50} depth={50} />
      <materialResource resourceId={`${textureTypes[ground]}Texture`} />
    </mesh>
  )
}

export default Ground
