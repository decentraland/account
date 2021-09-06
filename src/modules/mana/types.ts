import { ChainId, Network } from '@dcl/schemas'

export enum MaticEnv {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
}

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
  timestamp: number
  amount: number
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
  initializeHash: string
  finalizeHash: string | null
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
  id: string
  amount: number
  network: Network
  timestamp: number
  status: PurchaseStatus
  address: string
}
