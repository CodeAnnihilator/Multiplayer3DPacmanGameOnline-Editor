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
    const verZ = ver.z - 0.01 > 0 ? ver.z - 0.01 : Math.random() * 5
    return new Vector3(ver.x, ver.y, verZ)
  })
}

function generateVerticles() {
  const verticles = []
  _.times(3000, function(n){
    let x = Math.random() * 20
    let y = Math.random() * 20
    let z = Math.random() * 5
    verticles.push(new Vector3(x, y, z))
  })
  return verticles
}
