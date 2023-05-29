import { connect } from 'react-redux'
import { getNetworks, getData as getWallet } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Network } from '@dcl/schemas'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import {
  APPROVE_MANA_REQUEST,
  depositManaRequest,
  DEPOSIT_MANA_REQUEST,
  fetchManaPriceRequest,
  GET_APPROVED_MANA_REQUEST,
  initiateWithdrawalRequest,
  INITIATE_WITHDRAWAL_REQUEST,
  TRANSFER_MANA_REQUEST,
  clearManaError,
} from '../../../modules/mana/actions'
import { RootState } from '../../../modules/reducer'
import {
  getManaPrice,
  getLoading,
} from '../../../modules/mana/selectors'
import { MapDispatch, MapDispatchProps, MapState } from './ConvertManaModal.types'
import ConvertManaModal from './ConvertManaModal'

const mapState = (state: RootState): MapState => {
  const networks = getNetworks(state)
  let manaEth = 0
  let manaMatic = 0
  if (networks) {
    manaEth = networks[Network.ETHEREUM].mana
    manaMatic = networks[Network.MATIC].mana
  }

  return {
    manaEth,
    manaMatic,
    manaPrice: getManaPrice(state),
    wallet: getWallet(state),
    isLoading:
      isLoadingType(getLoading(state), DEPOSIT_MANA_REQUEST) ||
      isLoadingType(getLoading(state), TRANSFER_MANA_REQUEST) ||
      isLoadingType(getLoading(state), APPROVE_MANA_REQUEST) ||
      isLoadingType(getLoading(state), GET_APPROVED_MANA_REQUEST) ||
      isLoadingType(getLoading(state), INITIATE_WITHDRAWAL_REQUEST),
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onDepositMana: (amount) => dispatch(depositManaRequest(amount)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
  onWithdrawMana: (amount) => dispatch(initiateWithdrawalRequest(amount)),
  onClearManaError: () => dispatch(clearManaError())
})

export default connect(mapState, mapDispatch)(ConvertManaModal)
