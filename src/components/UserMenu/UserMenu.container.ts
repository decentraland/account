import { connect } from 'react-redux'
import { getLocation, push } from 'connected-react-router'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import {
  getAddress,
  getMana,
  isConnected,
  isConnecting,
} from 'decentraland-dapps/dist/modules/wallet/selectors'
import {
  connectWalletRequest,
  disconnectWallet,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { getData as getProfiles } from 'decentraland-dapps/dist/modules/profile/selectors'
import { getTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { RootState } from '../../modules/reducer'
import { locations } from '../../modules/locations'
import {
  MapStateProps,
  MapDispatch,
  MapDispatchProps,
  OwnProps,
} from './UserMenu.types'
import UserMenu from './UserMenu'

const mapState = (state: RootState): MapStateProps => {
  const address = getAddress(state)
  return {
    address,
    mana: getMana(state),
    profile: getProfiles(state)[address!],
    isLoggedIn: isConnected(state),
    isLoggingIn: isConnecting(state),
    isActivityPage: getLocation(state).pathname === locations.signIn(),
    hasPendingTransactions: getTransactions(state, address || '').some((tx) =>
      isPending(tx.status)
    ),
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onLogout: () => dispatch(disconnectWallet()),
  onLogin: () => dispatch(connectWalletRequest()),
  onNavigateToActivityPage: () => dispatch(push(locations.activity())),
  onNavigateToSettingsPage: () => dispatch(push(locations.settings())),
})

const mergeProps = (
  mapStateProps: MapStateProps,
  mapDispatchProps: MapDispatchProps,
  ownProps: OwnProps
) => ({
  ...mapStateProps,
  ...mapDispatchProps,
  ...ownProps,
})

export default connect(mapState, mapDispatch, mergeProps)(UserMenu)
