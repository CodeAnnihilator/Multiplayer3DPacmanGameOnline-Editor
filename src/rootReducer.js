import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'

import weatherReducer from '@src/reducers/weatherReducer'
import resourcesReducer from '@src/reducers/resourcesReducer'
import levelReducer from '@src/reducers/levelReducer'
import cameraReducer from '@src/reducers/cameraReducer'

export default enableBatching(combineReducers({
  camera: cameraReducer,
  weather: weatherReducer,
  resources: resourcesReducer,
  level: levelReducer
}))
