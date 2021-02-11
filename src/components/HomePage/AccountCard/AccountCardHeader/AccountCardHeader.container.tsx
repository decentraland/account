import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { connect } from 'react-redux'
import { openModal } from '../../../../modules/modal/actions'
import { RootState } from '../../../../modules/reducer'
import AccountCardHeader from './AccountCardHeader'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps
} from './AccountCardHeader.types'

const mapState = (state: RootState): MapStateProps => ({
  wallet: getAddress(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConvertToMaticMana: () => dispatch(openModal('ConvertToMaticManaModal')),
  onSendMana: () => dispatch(openModal('SendManaModal')),
  onReceiveMana: (walletAddress) =>
    dispatch(openModal('ReceiveManaModal', { walletAddress }))
})

export default connect(mapState, mapDispatch)(AccountCardHeader)
