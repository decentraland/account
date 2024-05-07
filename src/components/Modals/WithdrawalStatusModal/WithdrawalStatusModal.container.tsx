import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { FINISH_WITHDRAWAL_REQUEST, finishWithdrawalRequest } from '../../../modules/mana/actions'
import { getLoading, getTransactions, getWithdrawals } from '../../../modules/mana/selectors'
import { RootState } from '../../../modules/reducer'
import WithdrawalStatusModal from './WithdrawalStatusModal'
import { MapDispatch, MapDispatchProps } from './WithdrawalStatusModal.types'

const mapState = (state: RootState) => ({
  isLoading: isLoadingType(getLoading(state), FINISH_WITHDRAWAL_REQUEST),
  withdrawals: getWithdrawals(state),
  transactions: getTransactions(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onFinishWithdrawal: withdrawal => dispatch(finishWithdrawalRequest(withdrawal))
})

export default connect(mapState, mapDispatch)(WithdrawalStatusModal)
