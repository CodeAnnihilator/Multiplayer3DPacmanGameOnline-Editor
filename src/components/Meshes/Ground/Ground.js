import React from 'react'
import { Vector3, Euler } from 'three'

const textureTypes = [
  'forestGround'
]

const Ground = ({ positionX, positionZ, ground }) => {
  const renderPosition = new Vector3(positionX, 0, positionZ)
  return (
    <mesh receiveShadow position={renderPosition} rotation={new Euler(-Math.PI / 2, 0, 0)}>
      <boxGeometry width={50} height={50} depth={0.001} />
      <materialResource resourceId={`${textureTypes[ground]}Texture`} />
    </mesh>
  )
}

export default Ground
