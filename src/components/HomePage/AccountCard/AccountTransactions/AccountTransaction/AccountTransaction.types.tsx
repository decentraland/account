import { Dispatch } from 'redux'
import {
  Transaction,
  TransactionStatus,
  TransactionType,
  Withdrawal,
} from '../../../../../modules/mana/types'
import { OpenModalAction } from '../../../../../modules/modal/actions'

export type Props = {
  withdrawals: Withdrawal[]
  transaction: Transaction
  onPendingWithDrawal: (txHash: string) => void
  onTransactionDetail: (
    description: string,
    amount: number,
    status: TransactionStatus,
    type: TransactionType
  ) => void
}

export type MapStateProps = {
  withdrawals: Withdrawal[]
}
export type MapDispatchProps = Pick<
  Props,
  'onTransactionDetail' | 'onPendingWithDrawal'
>
export type MapDispatch = Dispatch<OpenModalAction>
