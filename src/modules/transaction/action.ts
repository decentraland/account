import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import { action } from 'typesafe-actions'

export const INSERT_TRANSACTION = 'Insert Transaction'
export const insertTransaction = (transaction: Transaction) =>
  action(INSERT_TRANSACTION, { transaction })
export type InsertTransactionAction = ReturnType<typeof insertTransaction>
