import { connect } from 'react-redux'

import HomePage from './HomePage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './HomePage.types'
import { getTransactionByNetwork, getWalletDeposits, getWalletWithdrawals } from '../../modules/mana/selectors'
import { RootState } from '../../modules/reducer'

const mapState = (state: RootState): MapStateProps => {
  return {
    transactionsByNetwork: getTransactionByNetwork(state),
    withdrawals: getWalletWithdrawals(state),
    deposits: getWalletDeposits(state)
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
