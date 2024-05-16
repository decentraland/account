import { connect } from 'react-redux'
import { SubscriptionDetails } from '@dcl/schemas'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import {
  GET_SUBSCRIPTIONS_REQUEST,
  VALIDATE_SUBSCRIPTION_EMAIL_REQUEST,
  saveSubscriptionEmailRequest,
  saveSubscriptionsRequest
} from '../../../modules/subscription/actions'
import {
  getEmail,
  getError,
  getLoading,
  getSubscriptionDetails,
  getUnconfirmedEmail,
  isIgnoringAllEmail
} from '../../../modules/subscription/selectors'
import NotificationGroupCard from './NotificationEmailCard'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './NotificationEmailCard.types'

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: ownProps.isLoading || isConnecting(state) || isLoadingType(getLoading(state), GET_SUBSCRIPTIONS_REQUEST),
    isSavingEmail: isLoadingType(getLoading(state), VALIDATE_SUBSCRIPTION_EMAIL_REQUEST),
    email: getEmail(state),
    unconfirmedEmail: getUnconfirmedEmail(state),
    error: getError(state),
    isIgnoringAllEmail: isIgnoringAllEmail(state),
    subscriptionDetails: getSubscriptionDetails(state),
    hasConfirmEmail: ownProps.hasConfirmEmail
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onChangeNotificationSetting: (subscriptionDetails: SubscriptionDetails) => dispatch(saveSubscriptionsRequest(subscriptionDetails)),
  onChangeEmail: (email: string) => dispatch(saveSubscriptionEmailRequest(email))
})

export default connect(mapStateToProps, mapDispatch)(NotificationGroupCard)
