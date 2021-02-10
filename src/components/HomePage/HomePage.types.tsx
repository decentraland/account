import { Dispatch } from 'redux'

export type Props = {
  mana: number
  manaL2: number
}

export enum NetworkType {
  MATIC = 'matic',
  ETHEREUM = 'ethereum',
}

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

export type MapStateProps = Pick<Props, 'mana' | 'manaL2'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
