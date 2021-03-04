import { Dispatch } from 'redux'

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

export type MapStateProps = {}
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
