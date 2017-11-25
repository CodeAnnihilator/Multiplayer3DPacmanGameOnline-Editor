import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'

import weatherReducer from '@src/reducers/weatherReducer'
import resourcesReducer from '@src/reducers/resourcesReducer'
import levelReducer from '@src/reducers/levelReducer'

export default enableBatching(combineReducers({
  weather: weatherReducer,
  resources: resourcesReducer,
  level: levelReducer
}))
