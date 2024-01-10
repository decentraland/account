import { connect } from 'react-redux'
import { openManaFiatGatewayRequest } from 'decentraland-dapps/dist/modules/gateway/actions'
import { RootState } from '../../../../../modules/reducer'
import AccountTransaction from './AccountTransaction'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountTransaction.types'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'

const mapState = (_state: RootState): MapStateProps => ({})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onPendingWithdrawal: (txHash) =>
    dispatch(openModal('WithdrawalStatusModal', { txHash })),
  onTransactionDetail: (description, transaction) =>
    dispatch(
      openModal('TransactionDetailModal', {
        description,
        transaction,
      })
    ),
  onPendingPurchase: (network, gateway) =>
    dispatch(openManaFiatGatewayRequest(network, gateway)),
})

export default connect(mapState, mapDispatch)(AccountTransaction)
