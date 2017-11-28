// import React, { Component } from 'react'
//
// import FirTree from '@src/meshes/trees/FirTree'
// import TreeTrump from '@src/meshes/trees/TreeTrump'
// import Ground from '@src/meshes/ground/Ground'
//
// export default class Level extends Component {
//   render() {
//     const { levelMatrix } = this.props
//     return (
//       <group>
//         {
//           levelMatrix.map((row, y) => {
//             return row.map((cell, x) => {
//               if (cell.type === 1) return <Ground positionX={x} positionY={y} ground={cell.ground} />
//               if (cell.type === 4) return <TreeTrump positionX={x} positionY={y} rotationY={cell.rotationY} ground={cell.ground} />
//               return <FirTree positionX={x} positionY={y} rotationY={cell.rotationY} ground={cell.ground} />
//             })
//           })
//         }
//       </group>
//     )
//   }
// }
