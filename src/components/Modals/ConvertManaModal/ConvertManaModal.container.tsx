import { connect } from 'react-redux'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  approveManaRequest,
  APPROVE_MANA_REQUEST,
  depositManaRequest,
  DEPOSIT_MANA_REQUEST,
  fetchManaPriceRequest,
  GET_APPROVED_MANA_REQUEST,
  initiateWithdrawalRequest,
  INITIATE_WITHDRAWAL_REQUEST,
  TRANSFER_MANA_REQUEST,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import {
  getManaPrice,
  getLoading,
  getAllowance,
  isWaitingForApproval,
} from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps } from './ConvertManaModal.types'
import ConvertManaModal from './ConvertManaModal'

const mapState = (state: RootState) => ({
  allowance: getAllowance(state),
  manaPrice: getManaPrice(state),
  isWaitingForApproval: isWaitingForApproval(state),
  isLoading:
    isLoadingType(getLoading(state), DEPOSIT_MANA_REQUEST) ||
    isLoadingType(getLoading(state), TRANSFER_MANA_REQUEST) ||
    isLoadingType(getLoading(state), APPROVE_MANA_REQUEST) ||
    isLoadingType(getLoading(state), GET_APPROVED_MANA_REQUEST) ||
    isLoadingType(getLoading(state), INITIATE_WITHDRAWAL_REQUEST),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onDepositMana: (amount) => dispatch(depositManaRequest(amount)),
  onApproveMana: (allowance) => dispatch(approveManaRequest(allowance)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
  onWithdrawMana: (amount) => dispatch(initiateWithdrawalRequest(amount)),
})

export default connect(mapState, mapDispatch)(ConvertManaModal)
