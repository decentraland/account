import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { clearSaveSubscriptionError, getSubscriptionsRequest } from '../../modules/subscription/actions'
import { getError } from '../../modules/subscription/selectors'
import { isConnecting } from '../../modules/wallet/selectors'
import HomePage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './MainPage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state),
    notificationSettingError: getError(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetNotificationSetting: () => dispatch(getSubscriptionsRequest()),
  onClearChangeNotificationSettingError: () => dispatch(clearSaveSubscriptionError())
})

export default connect(mapState, mapDispatch)(HomePage)
