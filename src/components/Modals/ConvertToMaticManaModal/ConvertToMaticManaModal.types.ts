import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  approveManaRequest,
  depositManaRequest,
  fetchManaPriceRequest,
  getApprovedManaRequest,
} from '../../../modules/mana/actions'

export type Props = ModalProps & {
  isLoading: boolean
  isWaitingApprovement: boolean
  allowance: string
  manaPrice: number
  onGetApprovedMana: typeof getApprovedManaRequest
  onApproveMana: typeof approveManaRequest
  onManaPrice: typeof fetchManaPriceRequest
  onDepositMana: typeof depositManaRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<
  Props,
  'onApproveMana' | 'onManaPrice' | 'onGetApprovedMana' | 'onDepositMana'
>
