import { connect } from 'react-redux'
import { getPendingTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { getAddress, isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getIsAuthDappEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'
import Navbar from './Navbar'
import { MapStateProps } from './Navbar.types'

const mapState = (state: RootState): MapStateProps => {
  const address = getAddress(state)

  return {
    hasActivity: address ? getPendingTransactions(state, address).length > 0 : false,
    isConnected: isConnected(state),
    isAuthDappEnabled: !!getIsAuthDappEnabled(state),
    address
  }
}

export default connect(mapState)(Navbar)
