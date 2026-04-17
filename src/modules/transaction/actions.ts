import { action } from '../../lib/utils/action'
import { Transaction } from './types'

export const FETCH_TRANSACTION_REQUEST = '[Request] Fetch Transaction'
export const FETCH_TRANSACTION_SUCCESS = '[Success] Fetch Transaction'
export const FETCH_TRANSACTION_FAILURE = '[Failure] Fetch Transaction'

export const fetchTransactionRequest = (address: string, txHash: string, onSuccess?: any) =>
  action(FETCH_TRANSACTION_REQUEST, { address, txHash, onSuccess })
export const fetchTransactionSuccess = (transaction: Transaction) => action(FETCH_TRANSACTION_SUCCESS, { transaction })
export const fetchTransactionFailure = (error: string) => action(FETCH_TRANSACTION_FAILURE, { error })

export type FetchTransactionSuccessAction = ReturnType<typeof fetchTransactionSuccess>
