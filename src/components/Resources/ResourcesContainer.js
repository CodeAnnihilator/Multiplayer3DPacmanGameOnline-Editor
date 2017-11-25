import { connect } from 'react-redux'

import { allModelsHaveBeenLoaded, allTexturesHaveBeenLoaded } from '@src/actions/loadResources'

import Resources from './Resources'

const mapStateToProps = state => ({
  isAllModelsLoaded: state.resources.isAllModelsLoaded,
  isAllTexturesLoaded: state.resources.isAllTexturesLoaded
})

const mapDispatchToProps = dispatch => ({
  allModelsHaveBeenLoaded: () => dispatch(allModelsHaveBeenLoaded()),
  allTexturesHaveBeenLoaded: () => dispatch(allTexturesHaveBeenLoaded())
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
