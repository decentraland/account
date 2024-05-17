import { connect } from 'react-redux'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { getSubscriptionsRequest } from '../../modules/subscription/actions'
import HomePage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './MainPage.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  return {
    isLoading: isConnecting(state),
    defaultTab: ownProps.defaultTab
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetNotificationSetting: () => dispatch(getSubscriptionsRequest())
})

export default connect(mapState, mapDispatch)(HomePage)
