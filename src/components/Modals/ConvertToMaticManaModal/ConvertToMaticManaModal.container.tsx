import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  approveManaRequest,
  APPROVE_MANA_REQUEST,
  depositManaRequest,
  DEPOSIT_MANA_REQUEST,
  fetchManaPriceRequest,
  getApprovedManaRequest,
  GET_APPROVED_MANA_REQUEST,
  SEND_MANA_REQUEST,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import {
  getManaPrice,
  getLoading,
  getAllowance,
  isWaitingApprovement,
} from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './ConvertToMaticManaModal.types'
import ConvertToMaticManaModal from './ConvertToMaticManaModal'

const mapState = (state: RootState) => ({
  allowance: getAllowance(state),
  manaPrice: getManaPrice(state),
  isWaitingApprovement: isWaitingApprovement(state),
  isLoading:
    isLoadingType(getLoading(state), DEPOSIT_MANA_REQUEST) ||
    isLoadingType(getLoading(state), SEND_MANA_REQUEST) ||
    isLoadingType(getLoading(state), APPROVE_MANA_REQUEST) ||
    isLoadingType(getLoading(state), GET_APPROVED_MANA_REQUEST),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onDepositMana: (amount) => dispatch(depositManaRequest(amount)),
  onGetApprovedMana: () => dispatch(getApprovedManaRequest()),
  onApproveMana: (allowance) => dispatch(approveManaRequest(allowance)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
})

export default connect(mapState, mapDispatch)(ConvertToMaticManaModal)
