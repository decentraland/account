import { ChainId } from '@dcl/schemas'

export enum TransactionStatus {
  QUEUED = 'queued',
  DROPPED = 'dropped',
  REPLACED = 'replaced',
  PENDING = 'pending',
  REVERTED = 'reverted',
  CONFIRMED = 'confirmed'
}

export type Transaction = {
  hash: string
  from: string
  actionType: string
  status: TransactionStatus | null
  chainId: ChainId
  timestamp: number
  payload: any
}
