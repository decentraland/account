import { Withdrawal } from '../mana/types'

// Migration v2: normalize withdrawal data shape
// Uses `any` for state since the shape changed between versions
const v2 = (state: any) => {
  const oldWithdrawals = state?.mana?.data?.withdrawals ?? []
  const oldTransactions = state?.transactions?.transactions ?? state?.transaction?.data ?? []
  const updatedWithdrawals = oldWithdrawals.map(mapOldWithdrawal)
  const updatedTransactions = oldTransactions.map(mapOldTransactions)

  return {
    ...state,
    mana: {
      ...state.mana,
      data: {
        ...state.mana?.data,
        withdrawals: updatedWithdrawals
      }
    },
    transactions: {
      ...state.transactions,
      transactions: updatedTransactions
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
