import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  fetchManaPriceRequest,
  transferManaRequest,
  TRANSFER_MANA_REQUEST,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import { getManaPrice, getLoading } from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './TransferManaModal.types'
import TransferManaModal from './TransferManaModal'

const mapState = (state: RootState) => ({
  manaPrice: getManaPrice(state),
  isLoading: isLoadingType(getLoading(state), TRANSFER_MANA_REQUEST),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransferMana: (to, amount, network) =>
    dispatch(transferManaRequest(to, amount, network)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
})

export default connect(mapState, mapDispatch)(TransferManaModal)
