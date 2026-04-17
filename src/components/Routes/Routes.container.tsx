import { connect } from 'react-redux'
import { closeAllModals } from '../../modules/modal/actions'
import { RootState } from '../../modules/reducer'
import { isConnected } from '../../modules/wallet/selectors'
import Routes from './Routes'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Routes.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  closeAllModals: () => dispatch(closeAllModals())
})

export default connect(mapState, mapDispatch)(Routes)
