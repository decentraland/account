import { Dispatch } from 'redux'
import { ModalProps } from '../../../lib/utils/ModalWrapper'
import { WithAuthorizedActionProps } from '../../../lib/utils/noop'
import { clearManaError, depositManaRequest, fetchManaPriceRequest, initiateWithdrawalRequest } from '../../../modules/mana/actions'
import { Wallet } from '../../../modules/wallet/selectors'

export type Props = ModalProps & {
  isLoading: boolean
  isWaitingForApproval: boolean
  manaEth: number
  manaMatic: number
  manaPrice: number
  wallet: Wallet | null
  onManaPrice: typeof fetchManaPriceRequest
  onDepositMana: typeof depositManaRequest
  onWithdrawMana: typeof initiateWithdrawalRequest
  onClearManaError: typeof clearManaError
} & WithAuthorizedActionProps

export type State = {}

export type MapState = Pick<Props, 'wallet' | 'isLoading' | 'manaEth' | 'manaMatic' | 'manaPrice'>
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onManaPrice' | 'onDepositMana' | 'onWithdrawMana' | 'onClearManaError'>
