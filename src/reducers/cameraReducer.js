import typeToReducer from 'type-to-reducer'
import { Vector3, Euler } from 'three'

const initialState = {
  position: new Vector3(500, 100, 500),
  lookAt: new Vector3(500, 460, 0)
}

export default typeToReducer({
    //
}, initialState)
