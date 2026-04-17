import { connect } from 'react-redux'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { RootState } from '../../modules/reducer'
import { getData as getWallet, isConnected, isConnecting } from '../../modules/wallet/selectors'
import ProtectedRoute from './ProtectedRoute'
import { MapStateProps } from './ProtectedRoute.types'

const mapState = (state: RootState): MapStateProps => {
  const wallet = getWallet(state)
  const identity = wallet ? localStorageGetIdentity(wallet?.address) : null

  return {
    isConnecting: isConnecting(state),
    isConnected: isConnected(state) && !!identity
  }
}

export default connect(mapState)(ProtectedRoute)
