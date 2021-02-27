export enum WithdrawStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
}

export type WithdrawTransaction = {
  hash: string
  status: WithdrawStatus
  from: string
  amount: number
}
