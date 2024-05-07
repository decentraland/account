import { connect } from 'react-redux'

import WithdrawalDataComponent from './WithdrawalDataComponent'
import { MapStateProps } from './WithdrawalDataComponent.types'
import { getWithdrawals } from '../../../../modules/mana/selectors'
import { RootState } from '../../../../modules/reducer'

const mapState = (state: RootState): MapStateProps => ({
  withdrawals: getWithdrawals(state)
})

export default connect(mapState)(WithdrawalDataComponent)
