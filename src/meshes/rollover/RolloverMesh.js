import React from 'react'
import { Vector3 } from 'three'

const textureTypes = [
  'forestGround'
]

const RolloverMesh = ({ mousePosition }) => {
  return (
    <mesh position={mousePosition}>
      <boxGeometry width={50} height={50} depth={50} />
      <meshBasicMaterial color={0xff0000} opacity={0.5} transparent={true} />
    </mesh>
  )
}

export default RolloverMesh
