function setBasicShape(cell) {
  return { type: cell, ground: 0, rotationY: setRandomRotation() }
}

function setRandomRotation() {
  return Math.round(Math.random() * 360)
}

export default function generateLevel(level) {
  return level.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      if (cell === 0) return setBasicShape(cell)
      return setBasicShape(cell)
    })
  })
}
