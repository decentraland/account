import { connect } from 'react-redux'
import { SubscriptionDetails } from '@dcl/schemas'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import { SAVE_SUBSCRIPTIONS_REQUEST, clearSaveSubscriptionError, saveSubscriptionsRequest } from '../../../modules/subscription/actions'
import { getError, getLoading, getSubscriptionDetails } from '../../../modules/subscription/selectors'
import NotificationGroupCard from './NotificationGroupCard'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './NotificationGroupCard.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: ownProps.isLoading || isConnecting(state),
    isSavingSubscription: isLoadingType(getLoading(state), SAVE_SUBSCRIPTIONS_REQUEST),
    subscriptionGroupKeys: ownProps.subscriptionGroupKeys,
    notificationTypesInGroup: ownProps.notificationTypesInGroup,
    subscriptionDetails: getSubscriptionDetails(state),
    error: getError(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onChangeNotificationSetting: (subscriptionDetails: SubscriptionDetails) => dispatch(saveSubscriptionsRequest(subscriptionDetails)),
  onClearChangeNotificationSettingError: () => dispatch(clearSaveSubscriptionError())
})

export default connect(mapStateToProps, mapDispatch)(NotificationGroupCard)
