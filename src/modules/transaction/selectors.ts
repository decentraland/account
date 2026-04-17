import { Transaction } from './types'
import { isPending } from './utils'

export const getData = (state: any): Transaction[] => {
  const txState = state.transactions
  if (!txState) return []
  const txs = txState.transactions
  if (!txs) return []
  // @dcl/core-web3 stores transactions as Record<string, Transaction>
  // Convert to array for backward compat
  if (Array.isArray(txs)) return txs
  return Object.values(txs)
}

export const getPendingTransactions = (state: any, address?: string): Transaction[] => {
  const txs = getData(state)
  return txs.filter(tx => isPending(tx.status) && (!address || tx.from.toLowerCase() === address.toLowerCase()))
}
