import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { FINISH_WITHDRAWAL_REQUEST, finishWithdrawalRequest } from '../../../modules/mana/actions'
import { getLoading, getTransactions, getWithdrawalByHash, isFinalizingWithdrawalTransaction } from '../../../modules/mana/selectors'
import { RootState } from '../../../modules/reducer'
import WithdrawalStatusModal from './WithdrawalStatusModal'
import { MapDispatch, MapDispatchProps, OwnProps } from './WithdrawalStatusModal.types'

const mapState = (state: RootState, ownProps: OwnProps) => {
  const withdrawalTransactionHash = ownProps.metadata?.txHash
  const withdrawal = withdrawalTransactionHash ? getWithdrawalByHash(state, withdrawalTransactionHash) : undefined
  const isFinalizingWithdrawal = withdrawalTransactionHash ? isFinalizingWithdrawalTransaction(state, withdrawalTransactionHash) : false

  return {
    isLoading: isLoadingType(getLoading(state), FINISH_WITHDRAWAL_REQUEST),
    withdrawal,
    isFinalizingWithdrawal,
    transactions: getTransactions(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFinishWithdrawal: withdrawal => dispatch(finishWithdrawalRequest(withdrawal))
})

export default connect(mapState, mapDispatch)(WithdrawalStatusModal)
