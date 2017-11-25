import { connect } from 'react-redux'

import Scene from './Scene'

const mapStateToProps = state => ({
  isAllModelsLoaded: state.resources.isAllModelsLoaded,
  isAllTexturesLoaded: state.resources.isAllTexturesLoaded
})

export default connect(mapStateToProps)(Scene)
