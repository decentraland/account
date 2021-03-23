import { ChainId, Network } from '@dcl/schemas'

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  PURCHASE = 'purchase',
}

export enum TransactionStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export type Transaction<T = any> = {
  hash: string
  type: TransactionType
  status: TransactionStatus
  data: T
}
export type Buy = {
  hash: string
  amount: number
}

export enum TransferStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export type Transfer = {
  hash: string
  network: Network
  chainId: ChainId
  amount: number
  to: string
  status: TransferStatus
  timestamp: number
}

export enum DepositStatus {
  PENDING = 'pending',
  COMPLETE = 'complete',
}

export type Deposit = {
  hash: string
  status: DepositStatus
  from: string
  amount: number
  timestamp: number
}

export enum WithdrawalStatus {
  PENDING = 'pending',
  CHECKPOINT = 'checkpoint',
  COMPLETE = 'complete',
}

export type Withdrawal = {
  hash: string
  status: WithdrawalStatus
  from: string
  amount: number
  timestamp: number
}

export enum PurchaseStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  COMPLETE = 'complete',
}

export type Purchase = {
  id: string // el id del order data,
  amount: number // cantidad de mana que compro
  network: Network // si fue en MANA de ethereum o de matic, para saber despues en que columna mostrarlo
  timestamp: number // el momento en que se hizo
  status: PurchaseStatus // un enum con los posibles estados
  orderData: any // aca metemos todo el order data
}
