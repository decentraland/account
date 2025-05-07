import { connect } from 'react-redux'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { clearSaveSubscriptionError, getSubscriptionsRequest } from '../../modules/subscription/actions'
import { getError } from '../../modules/subscription/selectors'
import HomePage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './MainPage.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: isConnecting(state),
    notificationSettingError: getError(state),
    skipNotifications: ownProps.skipNotifications
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetNotificationSetting: () => dispatch(getSubscriptionsRequest()),
  onClearChangeNotificationSettingError: () => dispatch(clearSaveSubscriptionError())
})

export default connect(mapState, mapDispatch)(HomePage)
