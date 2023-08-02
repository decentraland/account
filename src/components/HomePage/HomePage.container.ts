import { connect } from 'react-redux'
import {
  getWalletWithdrawals,
  getWalletDeposits,
  getTransactionByNetwork,
} from '../../modules/mana/selectors'
import { getIsProfileSiteEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'

import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    transactionsByNetwork: getTransactionByNetwork(state),
    isProfileSiteEnabled: getIsProfileSiteEnabled(state),
    withdrawals: getWalletWithdrawals(state),
    deposits: getWalletDeposits(state),
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
