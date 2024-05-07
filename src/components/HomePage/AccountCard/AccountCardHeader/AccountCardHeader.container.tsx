import { connect } from 'react-redux'
import { Network } from '@dcl/schemas'
import { openBuyManaWithFiatModalRequest } from 'decentraland-dapps/dist/modules/gateway/actions'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../../modules/reducer'
import AccountCardHeader from './AccountCardHeader'
import { MapDispatch, MapDispatchProps, MapStateProps } from './AccountCardHeader.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConvert: network => dispatch(openModal('ConvertManaModal', { network })),
  onTransfer: network => dispatch(openModal('TransferManaModal', { network })),
  onImportWithdrawal: () => dispatch(openModal('ImportWithdrawalModal')),
  onReceive: (network, address) => dispatch(openModal('ReceiveManaModal', { network, address })),
  onAddTokens: (selectedNetwork: Network) => dispatch(openBuyManaWithFiatModalRequest(selectedNetwork))
})

export default connect(mapState, mapDispatch)(AccountCardHeader)
