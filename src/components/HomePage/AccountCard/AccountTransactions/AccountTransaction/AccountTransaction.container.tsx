import { connect } from 'react-redux'
import { getWalletWithdrawals } from '../../../../../modules/mana/selectors'
import { openModal } from '../../../../../modules/modal/actions'
import { RootState } from '../../../../../modules/reducer'
import AccountTransaction from './AccountTransaction'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountTransaction.types'

const mapState = (state: RootState): MapStateProps => ({
  withdrawals: getWalletWithdrawals(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onPendingWithDrawal: (txHash) =>
    dispatch(openModal('WithdrawalStatusModal', { txHash })),
  onTransactionDetail: (description, amount, type, status) =>
    dispatch(
      openModal('TransactionDetailModal', {
        description,
        amount,
        type,
        status,
      })
    ),
})

export default connect(mapState, mapDispatch)(AccountTransaction)
