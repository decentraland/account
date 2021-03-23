import { connect } from 'react-redux'
import { openModal } from '../../../../../modules/modal/actions'
import { RootState } from '../../../../../modules/reducer'
import AccountTransaction from './AccountTransaction'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountTransaction.types'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onPendingWithDrawal: (txHash) =>
    dispatch(openModal('WithdrawalStatusModal', { txHash })),
  onTransactionDetail: (description, transaction) =>
    dispatch(
      openModal('TransactionDetailModal', {
        description,
        transaction,
      })
    ),
})

export default connect(mapState, mapDispatch)(AccountTransaction)
