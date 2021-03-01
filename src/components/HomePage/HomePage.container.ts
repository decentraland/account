import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
