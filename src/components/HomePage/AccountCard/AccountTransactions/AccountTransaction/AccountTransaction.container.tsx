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
  onTransactionDetail: () => dispatch(openModal('TransactionDetailModal'))
})

export default connect(mapState, mapDispatch)(AccountTransaction)
