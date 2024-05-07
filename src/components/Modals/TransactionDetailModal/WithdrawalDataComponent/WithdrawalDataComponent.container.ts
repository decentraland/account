import { connect } from 'react-redux'
import { getWithdrawals } from '../../../../modules/mana/selectors'
import { RootState } from '../../../../modules/reducer'
import WithdrawalDataComponent from './WithdrawalDataComponent'
import { MapStateProps } from './WithdrawalDataComponent.types'

const mapState = (state: RootState): MapStateProps => ({
  withdrawals: getWithdrawals(state)
})

export default connect(mapState)(WithdrawalDataComponent)
