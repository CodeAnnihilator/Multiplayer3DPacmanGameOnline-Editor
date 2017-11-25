import typeToReducer from 'type-to-reducer'

import {
  ALL_MODELS_HAVE_BEEN_LOADED,
  ALL_TEXTURES_HAVE_BEEN_LOADED
} from '@src/actions/loadResources'

const initialState = {
  isAllModelsLoaded: false,
  isAllTexturesLoaded: false,
}

export default typeToReducer({
  [ALL_MODELS_HAVE_BEEN_LOADED]: state => ({
    ...state,
    isAllModelsLoaded: true
  }),
  [ALL_TEXTURES_HAVE_BEEN_LOADED]: state => ({
    ...state,
    isAllTexturesLoaded: true
  }),
}, initialState)
