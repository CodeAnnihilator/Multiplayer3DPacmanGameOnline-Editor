import React from 'react'
import { Vector3 } from 'three'

const textureTypes = [
  'forestGround'
]

const Ground = ({ positionX, positionY, ground }) => {
  const renderPosition = new Vector3(positionX, positionY, 25)
  return (
    <mesh receiveShadow position={renderPosition}>
      <boxGeometry width={50} height={50} depth={50} />
      <materialResource resourceId={`${textureTypes[ground]}Texture`} />
    </mesh>
  )
}

export default Ground
