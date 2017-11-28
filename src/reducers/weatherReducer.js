import typeToReducer from 'type-to-reducer'
import * as _ from 'lodash'
import { Vector3 } from 'three'

import {
  UPDATE_SNOW
} from '@src/actions/onAnimate'

const initialState = {
  verticles: generateVerticles()
}

export default typeToReducer({
  [UPDATE_SNOW]: state => ({
    ...state,
    verticles: nextVerticlesPositions(state)
  }),
}, initialState)

function nextVerticlesPositions(state) {
  return state.verticles.map(ver => {
    const verZ = ver.z - 1 > 0 ? ver.z - 1 : 400 + Math.random() * 100
    return new Vector3(ver.x, ver.y, verZ)
  })
}

function generateVerticles() {
  const verticles = []
  _.times(3000, function(n){
    let x = Math.random() * 1000
    let y = Math.random() * 1000
    let z = Math.random() * 500
    verticles.push(new Vector3(x, y, z))
  })
  return verticles
}
