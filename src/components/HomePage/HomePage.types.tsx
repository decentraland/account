import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Transaction as RealTransaction } from 'decentraland-dapps/dist/modules/transaction/types'

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export enum TransactionStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
}

export type Transaction = {
  type: TransactionType
  status: TransactionStatus
  amount: number
  description: string
}

export type MapStateProps = {
  transactionsByNetwork: Record<Network, RealTransaction[]>
}
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
