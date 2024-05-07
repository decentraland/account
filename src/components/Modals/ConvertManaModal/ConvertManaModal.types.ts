import { WithAuthorizedActionProps } from 'decentraland-dapps/dist/containers/withAuthorizedAction'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Dispatch } from 'redux'

import { clearManaError, depositManaRequest, fetchManaPriceRequest, initiateWithdrawalRequest } from '../../../modules/mana/actions'

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
