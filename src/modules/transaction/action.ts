import { action } from 'typesafe-actions'

export const INSERT_TRANSACTION = 'Insert Transaction'
export const insertTransaction = (
  txHash: string,
  address: string,
  nonce: number,
  actionType: string
) => action(INSERT_TRANSACTION, { txHash, address, nonce, actionType })
export type InsertTransactionAction = ReturnType<typeof insertTransaction>
