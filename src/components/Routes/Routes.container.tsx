import { connect } from 'react-redux'
import { closeAllModals } from 'decentraland-dapps/dist/modules/modal'
import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsSubscriptionEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'
import Routes from './Routes'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Routes.types'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
  isSubscriptionEnabled: !!getIsSubscriptionEnabled(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  closeAllModals: () => dispatch(closeAllModals())
})

export default connect(mapState, mapDispatch)(Routes)
