import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { MapDispatch } from './WithdrawalStatusModal.types'
import WithdrawalStatusModal from './WithdrawalStatusModal'
import { getWithdrawals } from '../../../modules/mana/selectors'

const mapState = (state: RootState) => ({
  withdrawals: getWithdrawals(state)
})

const mapDispatch = (_dispatch: MapDispatch) => ({})

export default connect(mapState, mapDispatch)(WithdrawalStatusModal)
