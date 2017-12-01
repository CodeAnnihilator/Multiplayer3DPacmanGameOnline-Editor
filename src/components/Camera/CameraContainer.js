import { connect } from 'react-redux'

import Camera from './Camera'

import { updateCameraRemoteness } from '@src/actions/camera'

const mapStateToProps = state => ({
  position: state.camera.position,
  lookAt: state.camera.lookAt
})

const mapDispatchToProps = dispatch => ({
  updateCameraRemoteness: deltaY => dispatch(updateCameraRemoteness(deltaY))
})

export default connect(mapStateToProps, mapDispatchToProps)(Camera)
