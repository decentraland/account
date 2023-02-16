import { connect } from 'react-redux'
import { Network } from '@dcl/schemas'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { openBuyManaWithFiatModalRequest } from 'decentraland-dapps/dist/modules/gateway/actions'
import { openModal } from '../../../../modules/modal/actions'
import { RootState } from '../../../../modules/reducer'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountCardHeader.types'
import AccountCardHeader from './AccountCardHeader'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConvert: (network) => dispatch(openModal('ConvertManaModal', { network })),
  onTransfer: (network) =>
    dispatch(openModal('TransferManaModal', { network })),
  onImportWithdrawal: () => dispatch(openModal('ImportWithdrawalModal')),
  onReceive: (network, address) =>
    dispatch(openModal('ReceiveManaModal', { network, address })),
  onAddTokens: (selectedNetwork: Network) =>
    dispatch(openBuyManaWithFiatModalRequest(selectedNetwork)),
})

export default connect(mapState, mapDispatch)(AccountCardHeader)
