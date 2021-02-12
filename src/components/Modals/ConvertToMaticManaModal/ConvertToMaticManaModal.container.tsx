import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  approveManaRequest,
  APPROVE_MANA_REQUEST,
  fetchManaPriceRequest,
  SEND_MANA_REQUEST,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import { getManaPrice, getLoading } from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './ConvertToMaticManaModal.types'
import ConvertToMaticManaModal from './ConvertToMaticManaModal'

const mapState = (state: RootState) => ({
  manaPrice: getManaPrice(state),
  isLoading:
    isLoadingType(getLoading(state), SEND_MANA_REQUEST) ||
    isLoadingType(getLoading(state), APPROVE_MANA_REQUEST),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onApproveMana: (allowance) => dispatch(approveManaRequest(allowance)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
})

export default connect(mapState, mapDispatch)(ConvertToMaticManaModal)
