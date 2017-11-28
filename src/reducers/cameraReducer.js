import typeToReducer from 'type-to-reducer'
import { Vector3 } from 'three'
// import {
//   ALL_MODELS_HAVE_BEEN_LOADED,
//   ALL_TEXTURES_HAVE_BEEN_LOADED
// } from '@src/actions/loadResources'

const initialState = {
  position: new Vector3(500, 100, 500),
  lookAt: new Vector3(500, 460, 0),
}

export default typeToReducer({
  //
}, initialState)
