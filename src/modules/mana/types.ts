import { Network } from '@dcl/schemas'

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
