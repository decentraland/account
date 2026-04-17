import { connect } from 'react-redux'
import { getIsReferralEnabled, getIsStreamingEnabled } from '../../modules/features/selectors'
import { isLoadingType } from '../../modules/loading/selectors'
import { RootState } from '../../modules/reducer'
import { GET_SUBSCRIPTIONS_REQUEST, getSubscriptionsRequest } from '../../modules/subscription/actions'
import { getLoading } from '../../modules/subscription/selectors'
import { getAddress, isConnecting } from '../../modules/wallet/selectors'
import Notifications from './Notifications'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './Notifications.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: ownProps.isLoading || isConnecting(state) || isLoadingType(getLoading(state), GET_SUBSCRIPTIONS_REQUEST),
    address: getAddress(state),
    isStreamingEnabled: getIsStreamingEnabled(state),
    isReferralEnabled: getIsReferralEnabled(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetSubscription: () => dispatch(getSubscriptionsRequest())
})

export default connect(mapState, mapDispatch)(Notifications)
