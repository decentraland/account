import { connect } from 'react-redux'
import { getData as getWallet, isConnected, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import ProtectedRoute from './ProtectedRoute'
import { MapStateProps } from './ProtectedRoute.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    wallet: getWallet(state),
    isConnecting: isConnecting(state),
    isConnected: isConnected(state)
  }
}

export default connect(mapState)(ProtectedRoute)
