import { Withdrawal } from '../mana/types'
import { RootState } from '../reducer'

const v2 = (state: RootState) => {
  const oldWithdrawals = state.mana.data.withdrawals
  const oldTransactions = state.transaction.data
  const updatedWithdrawals = oldWithdrawals.map(mapOldWithdrawal)
  const updatedTransactions = oldTransactions.map(mapOldTransactions)

  return {
    ...state,
    mana: {
      ...state.mana,
      data: {
        ...state.mana.data,
        withdrawals: updatedWithdrawals
      }
    },
    transaction: {
      ...state.transaction,
      data: updatedTransactions
    }
  }
}

const mapOldWithdrawal = (withdrawal: any): Withdrawal => ({
  amount: withdrawal.amount,
  from: withdrawal.from,
  status: withdrawal.status,
  timestamp: withdrawal.timestamp,
  finalizeHash: withdrawal.finalizeHash || null,
  initializeHash: withdrawal.initializeHash || withdrawal.hash
})

const mapOldTransactions = (transaction: any) => ({
  ...transaction,
  payload: transaction.payload?.withdrawal
    ? {
        ...transaction.payload,
        withdrawal: mapOldWithdrawal(transaction.payload.withdrawal)
      }
    : transaction.payload
})

export default v2
