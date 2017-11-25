import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'

import weatherReducer from '@src/reducers/weatherReducer'
import resourcesReducer from '@src/reducers/resourcesReducer'

export default enableBatching(combineReducers({
  weather: weatherReducer,
  resources: resourcesReducer,
}))
