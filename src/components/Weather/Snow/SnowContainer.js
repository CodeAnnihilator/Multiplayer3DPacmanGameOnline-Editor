import { connect } from 'react-redux'

import Snow from './Snow'

const mapStateToProps = state => ({
  verticles: state.weather.verticles
})

export default connect(mapStateToProps)(Snow)
