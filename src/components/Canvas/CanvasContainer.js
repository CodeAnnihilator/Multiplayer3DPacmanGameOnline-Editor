import { connect } from 'react-redux'

import { updateSnow } from '@src/actions/onAnimate'

import Canvas from './Canvas'

const mapDispatchToProps = dispatch => ({
  onAnimate: () => {
    dispatch(updateSnow())
  }
})

export default connect(null, mapDispatchToProps)(Canvas)
