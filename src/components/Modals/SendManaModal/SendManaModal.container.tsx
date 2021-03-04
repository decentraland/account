import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  fetchManaPriceRequest,
  sendManaRequest,
  SEND_MANA_REQUEST,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import { getManaPrice, getLoading } from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './SendManaModal.types'
import SendManaModal from './SendManaModal'

const mapState = (state: RootState) => ({
  manaPrice: getManaPrice(state),
  isLoading: isLoadingType(getLoading(state), SEND_MANA_REQUEST),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSendMana: (to, amount, network) =>
    dispatch(sendManaRequest(to, amount, network)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
})

export default connect(mapState, mapDispatch)(SendManaModal)
