import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { connect } from 'react-redux'
import { openModal } from '../../../../modules/modal/actions'
import { RootState } from '../../../../modules/reducer'
import { openTransak } from '../../../../modules/transak/actions'
import AccountCardHeader from './AccountCardHeader'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './AccountCardHeader.types'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConvert: (network) => dispatch(openModal('ConvertManaModal', { network })),
  onTransfer: (network) =>
    dispatch(openModal('TransferManaModal', { network })),
  onReceive: (network, address) =>
    dispatch(openModal('ReceiveManaModal', { network, address })),
  onPurchase: (network) => dispatch(openTransak(network)),
})

export default connect(mapState, mapDispatch)(AccountCardHeader)
