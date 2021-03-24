import { Dispatch } from 'redux'
import { Transaction } from '../../../../../modules/mana/types'
import { OpenModalAction } from '../../../../../modules/modal/actions'
import {
  openTransak,
  OpenTransakAction,
} from '../../../../../modules/transak/actions'

export type Props = {
  transaction: Transaction
  onPendingWithdrawal: (txHash: string) => void
  onPendingPurchase: typeof openTransak
  onTransactionDetail: (description: string, transaction: Transaction) => void
}

export type MapStateProps = {}

export type MapDispatchProps = Pick<
  Props,
  'onTransactionDetail' | 'onPendingWithdrawal' | 'onPendingPurchase'
>
export type MapDispatch = Dispatch<OpenModalAction | OpenTransakAction>
