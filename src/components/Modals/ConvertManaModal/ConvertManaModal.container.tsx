import { connect } from 'react-redux'

import { Network } from '@dcl/schemas'
import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { getNetworks, getData as getWallet } from 'decentraland-dapps/dist/modules/wallet/selectors'

import ConvertManaModal from './ConvertManaModal'
import { MapDispatch, MapDispatchProps, MapState } from './ConvertManaModal.types'
import {
  APPROVE_MANA_REQUEST,
  DEPOSIT_MANA_REQUEST,
  GET_APPROVED_MANA_REQUEST,
  INITIATE_WITHDRAWAL_REQUEST,
  TRANSFER_MANA_REQUEST,
  clearManaError,
  depositManaRequest,
  fetchManaPriceRequest,
  initiateWithdrawalRequest
} from '../../../modules/mana/actions'
import { getLoading, getManaPrice } from '../../../modules/mana/selectors'
import { RootState } from '../../../modules/reducer'

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
      isLoadingType(getLoading(state), INITIATE_WITHDRAWAL_REQUEST)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onDepositMana: amount => dispatch(depositManaRequest(amount)),
  onManaPrice: () => dispatch(fetchManaPriceRequest()),
  onWithdrawMana: amount => dispatch(initiateWithdrawalRequest(amount)),
  onClearManaError: () => dispatch(clearManaError())
})

export default connect(mapState, mapDispatch)(ConvertManaModal)
