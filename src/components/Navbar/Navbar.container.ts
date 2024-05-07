import { connect } from 'react-redux'

import { getLocation, push } from 'connected-react-router'
import { getPendingTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { getAddress, isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'

import Navbar from './Navbar'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Navbar.types'
import { getIsAuthDappEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'

const mapState = (state: RootState): MapStateProps => {
  const address = getAddress(state)

  return {
    hasActivity: address ? getPendingTransactions(state, address).length > 0 : false,
    isConnected: isConnected(state),
    pathname: getLocation(state).pathname,
    isAuthDappEnabled: !!getIsAuthDappEnabled(state),
    address
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: path => dispatch(push(path))
})

export default connect(mapState, mapDispatch)(Navbar)
