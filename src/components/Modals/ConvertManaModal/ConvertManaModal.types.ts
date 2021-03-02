import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  approveManaRequest,
  depositManaRequest,
  fetchManaPriceRequest,
  initiateWithdrawalRequest,
} from '../../../modules/mana/actions'

export type Props = ModalProps & {
  isLoading: boolean
  isWaitingForApproval: boolean
  allowance: string
  manaPrice: number
  onApproveMana: typeof approveManaRequest
  onManaPrice: typeof fetchManaPriceRequest
  onDepositMana: typeof depositManaRequest
  onWithdrawMana: typeof initiateWithdrawalRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<
  Props,
  'onApproveMana' | 'onManaPrice' | 'onDepositMana' | 'onWithdrawMana'
>
