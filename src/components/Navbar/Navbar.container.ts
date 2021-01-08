import { connect } from 'react-redux'
import { push, getLocation } from 'connected-react-router'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import {
  getAddress,
  isConnected,
} from 'decentraland-dapps/dist/modules/wallet/selectors'

import { RootState } from '../../modules/reducer'
import { MapStateProps, MapDispatch, MapDispatchProps } from './Navbar.types'
import Navbar from './Navbar'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
  pathname: getLocation(state).pathname,
  hasPendingTransactions: getTransactions(
    state,
    getAddress(state) || ''
  ).some((tx) => isPending(tx.status)),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onNavigate: (path) => dispatch(push(path)),
})

export default connect(mapState, mapDispatch)(Navbar)
