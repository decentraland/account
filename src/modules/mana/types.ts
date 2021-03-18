import { ChainId, Network } from '@dcl/schemas'

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  SEND = 'send',
  BUY = 'buy',
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

export enum SendStatus {
  CONFIRMED = 'confirmed',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export type Send = {
  hash: string
  network: Network
  chainId: ChainId
  amount: number
  to: string
  status: SendStatus
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
