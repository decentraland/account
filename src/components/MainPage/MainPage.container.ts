import { connect } from 'react-redux'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { getSubscriptionsRequest } from '../../modules/subscription/actions'
import HomePage from './MainPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './MainPage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetNotificationSetting: () => dispatch(getSubscriptionsRequest())
})

export default connect(mapState, mapDispatch)(HomePage)
