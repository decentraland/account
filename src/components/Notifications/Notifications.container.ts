import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { GET_SUBSCRIPTIONS_REQUEST, getSubscriptionsRequest } from '../../modules/subscription/actions'
import { getLoading } from '../../modules/subscription/selectors'
import Notifications from './Notifications'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './Notifications.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: ownProps.isLoading || isConnecting(state) || isLoadingType(getLoading(state), GET_SUBSCRIPTIONS_REQUEST)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetSubscription: () => dispatch(getSubscriptionsRequest())
})

export default connect(mapState, mapDispatch)(Notifications)
