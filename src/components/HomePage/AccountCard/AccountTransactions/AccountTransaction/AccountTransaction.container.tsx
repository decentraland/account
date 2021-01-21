import { connect } from 'react-redux'
import { openModal } from '../../../../../modules/modal/actions'
import { RootState } from '../../../../../modules/reducer'
import AccountTransaction from './AccountTransaction'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps
} from './AccountTransaction.types'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransactionDetail: (description, amount, type, status) =>
    dispatch(
      openModal('TransactionDetailModal', {
        description,
        amount,
        type,
        status
      })
    )
})

export default connect(mapState, mapDispatch)(AccountTransaction)
