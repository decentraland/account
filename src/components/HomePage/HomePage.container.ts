import { connect } from 'react-redux'
import {
  getMana,
  getManaL2,
} from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'

const mapState = (state: RootState): MapStateProps => ({
  mana: getMana(state) || 0,
  manaL2: getManaL2(state) || 0,
})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
