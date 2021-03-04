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
