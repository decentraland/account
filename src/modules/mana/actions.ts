import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'decentraland-dapps/dist/modules/transaction/utils'
import { WithdrawStatus, WithdrawTransaction } from './types'

// Get MANA Approved
export const DEPOSIT_MANA_REQUEST = '[Request] Deposit MANA'
export const DEPOSIT_MANA_SUCCESS = '[Success] Deposit MANA'
export const DEPOSIT_MANA_FAILURE = '[Failure] Deposit MANA'

export const depositManaRequest = (amount: number) =>
  action(DEPOSIT_MANA_REQUEST, { amount })
export const depositManaSuccess = (amount: number, txHash: string) =>
  action(DEPOSIT_MANA_SUCCESS, { amount, txHash })
export const depositManaFailure = (amount: number, error: string) =>
  action(DEPOSIT_MANA_FAILURE, { amount, error })

export type DepositManaRequestAction = ReturnType<typeof depositManaRequest>
export type DepositManaSuccessAction = ReturnType<typeof depositManaSuccess>
export type DepositManaFailureAction = ReturnType<typeof depositManaFailure>

// Get MANA Approved
export const GET_APPROVED_MANA_REQUEST = '[Request] Get Approved MANA'
export const GET_APPROVED_MANA_SUCCESS = '[Success] Get Approved MANA'
export const GET_APPROVED_MANA_FAILURE = '[Failure] Get Approved MANA'

export const getApprovedManaRequest = () => action(GET_APPROVED_MANA_REQUEST)
export const getApprovedManaSuccess = (allowance: string) =>
  action(GET_APPROVED_MANA_SUCCESS, { allowance })
export const getApprovedManaFailure = (error: string) =>
  action(GET_APPROVED_MANA_FAILURE, { error })

export type GetApprovedManaRequestAction = ReturnType<
  typeof getApprovedManaRequest
>
export type GetApprovedManaSuccessAction = ReturnType<
  typeof getApprovedManaSuccess
>
export type GetApprovedManaFailureAction = ReturnType<
  typeof getApprovedManaFailure
>

// Approve MANA
export const APPROVE_MANA_REQUEST = '[Request] Approve MANA'
export const APPROVE_MANA_SUCCESS = '[Success] Approve MANA'
export const APPROVE_MANA_FAILURE = '[Failure] Approve MANA'

export const approveManaRequest = (allowance: string) =>
  action(APPROVE_MANA_REQUEST, { allowance })
export const approveManaSuccess = (
  allowance: string,
  address: string,
  txHash: string
) =>
  action(APPROVE_MANA_SUCCESS, {
    ...buildTransactionPayload(txHash, { allowance, address }),
    allowance,
    address,
  })
export const approveManaFailure = (allowance: string, error: string) =>
  action(APPROVE_MANA_FAILURE, { allowance, error })

export type ApproveManaRequestAction = ReturnType<typeof approveManaRequest>
export type ApproveManaSuccessAction = ReturnType<typeof approveManaSuccess>
export type ApproveManaFailureAction = ReturnType<typeof approveManaFailure>

// Send MANA
export const SEND_MANA_REQUEST = '[Request] Send Mana'
export const SEND_MANA_SUCCESS = '[Success] Send Mana'
export const SEND_MANA_FAILURE = '[Failure] Send Mana'

export const sendManaRequest = (to: string, amount: number) =>
  action(SEND_MANA_REQUEST, { to, amount })
export const sendManaSuccess = (to: string, amount: number, txHash: string) =>
  action(SEND_MANA_SUCCESS, {
    to,
    amount,
    ...buildTransactionPayload(txHash, { to, amount }),
  })
export const sendManaFailure = (to: string, amount: number, error: string) =>
  action(SEND_MANA_FAILURE, { to, amount, error })

export type SendManaRequestAction = ReturnType<typeof sendManaRequest>
export type SendManaSuccessAction = ReturnType<typeof sendManaSuccess>
export type SendManaFailureAction = ReturnType<typeof sendManaFailure>

// Fetch MANA Price
export const FETCH_MANA_PRICE_REQUEST = '[Request] Fetch MANA Price'
export const FETCH_MANA_PRICE_SUCCESS = '[Success] Fetch MANA Price'
export const FETCH_MANA_PRICE_FAILURE = '[Failure] Fetch MANA Price'

export const fetchManaPriceRequest = () => action(FETCH_MANA_PRICE_REQUEST)
export const fetchManaPriceSuccess = (price: number) =>
  action(FETCH_MANA_PRICE_SUCCESS, { price })
export const fetchManaPriceFailure = (error: string) =>
  action(FETCH_MANA_PRICE_FAILURE, { error })

export type FetchManaPriceRequestAction = ReturnType<
  typeof fetchManaPriceRequest
>
export type FetchManaPriceSuccessAction = ReturnType<
  typeof fetchManaPriceSuccess
>
export type FetchManaPriceFailureAction = ReturnType<
  typeof fetchManaPriceFailure
>

// Withdraw MANA
export const WITHDRAW_MANA_REQUEST = '[Request] Withdraw Mana'
export const WITHDRAW_MANA_SUCCESS = '[Success] Withdraw Mana'
export const WITHDRAW_MANA_FAILURE = '[Failure] Withdraw Mana'

export const withdrawManaRequest = (amount: number) =>
  action(WITHDRAW_MANA_REQUEST, { amount })
export const withdrawManaSuccess = (amount: number, _txHash: string) =>
  action(WITHDRAW_MANA_SUCCESS, { amount })
export const withdrawManaFailure = (amount: number, error: string) =>
  action(WITHDRAW_MANA_FAILURE, { amount, error })

export type WithdrawManaRequestAction = ReturnType<typeof withdrawManaRequest>
export type WithdrawManaSuccessAction = ReturnType<typeof withdrawManaSuccess>
export type WithdrawManaFailureAction = ReturnType<typeof withdrawManaFailure>

// Watch Withdraw Transaction
export const WATCH_WITHDRAW_TRANSACTION_REQUEST =
  '[Request] Watch Withdraw Transaction'
export const WATCH_WITHDRAW_TRANSACTION_SUCCESS =
  '[Success] Watch Withdraw Transaction'
export const WATCH_WITHDRAW_TRANSACTION_FAILURE =
  '[Failure] Watch Withdraw Transaction'
export const watchWithdrawTransactionRequest = (
  txHash: string,
  amount: number
) => action(WATCH_WITHDRAW_TRANSACTION_REQUEST, { txHash, amount })
export const watchWithdrawTransactionSuccess = (tx: WithdrawTransaction) =>
  action(WATCH_WITHDRAW_TRANSACTION_SUCCESS, { tx })
export const watchWithdrawTransactionFailure = (
  txHash: string,
  error: string
) => action(WATCH_WITHDRAW_TRANSACTION_FAILURE, { txHash, error })
export type WatchWithdrawTransactionRequestAction = ReturnType<
  typeof watchWithdrawTransactionRequest
>
export type WatchWithdrawTransactionSuccessAction = ReturnType<
  typeof watchWithdrawTransactionSuccess
>
export type WatchWithdrawTransactionFailureAction = ReturnType<
  typeof watchWithdrawTransactionFailure
>

// Watch Pending Transactions
export const WATCH_PENDING_TRANSACTIONS = 'Watch Pending Transactions'
export const watchPendingTransactions = () => action(WATCH_PENDING_TRANSACTIONS)
export type WatchPendingTransactionsAction = ReturnType<
  typeof watchPendingTransactions
>

// Set Withdraw Transaction Status
export const SET_WITHDRAW_TRANSACTION_STATUS = 'Set Withdraw Transaction Status'
export const setWithdrawTransactionStatus = (
  txHash: string,
  status: WithdrawStatus
) => action(SET_WITHDRAW_TRANSACTION_STATUS, { txHash, status })
export type SetWithdrawTransactionStatusAction = ReturnType<
  typeof setWithdrawTransactionStatus
>

// Exit Deposit
export const EXIT_DEPOSIT_REQUEST = '[Request] Exit Deposit'
export const EXIT_DEPOSIT_SUCCESS = '[Success] Exit Deposit'
export const EXIT_DEPOSIT_FAILURE = '[Failure] Exit Deposit'

export const exitDepositRequest = (tx: WithdrawTransaction) =>
  action(EXIT_DEPOSIT_REQUEST, { tx })
export const exitDepositSuccess = (tx: WithdrawTransaction, txHash: string) =>
  action(EXIT_DEPOSIT_SUCCESS, {
    tx,
    ...buildTransactionPayload(txHash, { tx }),
  })
export const exitDepositFailure = (amount: number, error: string) =>
  action(EXIT_DEPOSIT_FAILURE, { amount, error })

export type ExitDepositRequestAction = ReturnType<typeof exitDepositRequest>
export type ExitDepositSuccessAction = ReturnType<typeof exitDepositSuccess>
export type ExitDepositFailureAction = ReturnType<typeof exitDepositFailure>
