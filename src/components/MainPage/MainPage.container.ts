import { connect } from 'react-redux'
import { getProviderType, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { clearSaveSubscriptionError } from '../../modules/subscription/actions'
import { getError } from '../../modules/subscription/selectors'
import HomePage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './MainPage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state),
    providerType: getProviderType(state),
    notificationSettingError: getError(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClearChangeNotificationSettingError: () => dispatch(clearSaveSubscriptionError())
})

export default connect(mapState, mapDispatch)(HomePage)
