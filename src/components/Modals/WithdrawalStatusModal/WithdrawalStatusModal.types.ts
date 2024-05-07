import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Dispatch } from 'redux'

import { finishWithdrawalRequest } from '../../../modules/mana/actions'
import { Withdrawal } from '../../../modules/mana/types'

export type Props = ModalProps & {
  isLoading: boolean
  withdrawals: Withdrawal[]
  transactions: Transaction[]
  onFinishWithdrawal: typeof finishWithdrawalRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onFinishWithdrawal'>
