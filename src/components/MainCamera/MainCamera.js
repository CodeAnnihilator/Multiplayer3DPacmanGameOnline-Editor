import React, { Component } from 'react'
import { Vector3 } from 'three'

export default class MainCamera extends Component {
  render() {
    const { innerWidth, innerHeight } = window
    const cameraPosition = new Vector3(0, 0, 5)
    return (
      <perspectiveCamera
        name='camera'
        fov={75}
        aspect={innerWidth / innerHeight}
        near={0.1}
        far={1000}
        position={cameraPosition}
      />
    )
  }
}



// import React, { Component } from 'react'
// import { Vector3 } from 'three'
//
// export default class Camera extends Component {
//   render() {
//     const { cameraPositionX, cameraPositionY } = this.props
//     const width = window.innerWidth
//     const height = window.innerHeight
//     const cameraPosition = new Vector3(cameraPositionX, cameraPositionY - 1, 4)
//     const lookAt = new Vector3(cameraPositionX, cameraPositionY, 0)
//     return (
//       <perspectiveCamera
//         name='camera'
//         fov={ 75 }
//         aspect={ width / height }
//         near={ 0.1 }
//         far={ 1000 }
//         position={ cameraPosition }
//         lookAt={ lookAt }
//       />
//     )
//   }
// }
