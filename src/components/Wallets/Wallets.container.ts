import { connect } from 'react-redux'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { getTransactionByNetwork, getWalletDeposits, getWalletWithdrawals } from '../../modules/mana/selectors'
import { RootState } from '../../modules/reducer'
import Wallets from './Wallets'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Wallets.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    transactionsByNetwork: getTransactionByNetwork(state),
    withdrawals: getWalletWithdrawals(state),
    deposits: getWalletDeposits(state),
    address: getAddress(state)!
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(Wallets)
