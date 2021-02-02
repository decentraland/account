import { connect } from 'react-redux'
import {
  fetchManaPriceRequest,
  sendManaRequest,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import { getManaPrice } from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './SendManaModal.types'
import SendManaModal from './SendManaModal'

const mapState = (state: RootState) => ({
  manaPrice: getManaPrice(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSendMana: (to, amount) => dispatch(sendManaRequest(to, amount)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
})

export default connect(mapState, mapDispatch)(SendManaModal)
