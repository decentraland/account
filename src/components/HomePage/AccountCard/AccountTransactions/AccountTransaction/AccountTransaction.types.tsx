import { Dispatch } from 'redux'
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../../../../../modules/mana/types'
import { OpenModalAction } from '../../../../../modules/modal/actions'

export type Props = {
  transaction: Transaction
  onPendingWithDrawal: (txHash: string) => void
  onTransactionDetail: (
    description: string,
    amount: number,
    status: TransactionStatus,
    type: TransactionType
  ) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<
  Props,
  'onTransactionDetail' | 'onPendingWithDrawal'
>
export type MapDispatch = Dispatch<OpenModalAction>
