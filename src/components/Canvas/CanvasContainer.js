import { connect } from 'react-redux'

import { updateSnow } from '@src/actions/onAnimate'

import Canvas from './Canvas'

const mapStateToProps = state => ({
  allModelsLoaded: state.resources.allModelsLoaded,
  allTexturesLoaded: state.resources.allTexturesLoaded
})

const mapDispatchToProps = dispatch => ({
  onAnimate: () => {
    dispatch(updateSnow())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
