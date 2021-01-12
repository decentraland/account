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

export type Props = {
  type: NetworkType
  title: string
  onFetchAmount: () => number
  onFetchTransactions: () => Transaction[]
}
