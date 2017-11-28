import { connect } from 'react-redux'

import Level from './Level'

const mapStateToProps = state => ({
  levelMatrix: state.level.levelMatrix,
})

export default connect(mapStateToProps)(Level)
