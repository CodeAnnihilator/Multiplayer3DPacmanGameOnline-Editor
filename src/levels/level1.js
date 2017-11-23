const ground = [
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0 ],
  [ 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0 ],
  [ 0, 2, 0, 2, 0, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 2, 2, 3, 0, 0 ],
  [ 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 0, 2, 2, 0 ],
  [ 0, 2, 2, 2, 3, 2, 2, 2, 0, 0, 2, 0, 2, 2, 2, 2, 0, 0, 2, 0 ],
  [ 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0 ],
  [ 0, 2, 2, 2, 2, 0, 2, 0, 0, 4, 0, 0, 2, 0, 2, 2, 2, 2, 2, 0 ],
  [ 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 0, 0, 2, 2, 0 ],
  [ 0, 2, 6, 6, 2, 6, 6, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 2, 2, 0 ],
  [ 0, 2, 6, 4, 4, 4, 6, 0, 2, 0, 0, 4, 0, 0, 2, 0, 0, 0, 2, 0 ],
  [ 0, 2, 2, 4, 4, 4, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 0 ],
  [ 0, 2, 6, 4, 4, 4, 6, 0, 2, 5, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0 ],
  [ 0, 2, 6, 6, 2, 6, 6, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0 ],
  [ 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 0, 3, 0 ],
  [ 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0 ],
  [ 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0 ],
  [ 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 0, 2, 0 ],
  [ 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 3, 0, 2, 2, 2, 2, 2, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
]

const randomGround = ground.map((row, rowIndex) => {
  return row.map((cell, cellIndex) => {

    if (rowIndex === 0) return { groundType: 0, assetType: 1, rotationX: 0 }
    if (rowIndex === ground.length - 1) return { groundType: 0, assetType: 1, rotationX: 0 }
    if (cellIndex === 0) return { groundType: 0, assetType: 1, rotationX: 0 }
    if (cellIndex === row.length - 1) return { groundType: 0, assetType: 1, rotationX: 0 }

    if (cell === 6) return { groundType: cell, assetType: 1, rotationX: Math.round(Math.random() * 360) }
    if (cell === 0) return { groundType: cell, assetType: 2, rotationX: Math.round(Math.random() * 360) }
    return { groundType: cell, assetType: 0, rotationX: Math.round(Math.random() * 360) }
  })
})

export default randomGround
