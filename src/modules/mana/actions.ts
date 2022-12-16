import { action } from 'typesafe-actions'
import { ChainId, Network } from '@dcl/schemas'
import { buildTransactionPayload } from 'decentraland-dapps/dist/modules/transaction/utils'
import {
  WithdrawalStatus,
  Withdrawal,
  Deposit,
  DepositStatus,
  Transfer,
} from './types'

// Get MANA Approved
export const DEPOSIT_MANA_REQUEST = '[Request] Deposit MANA'
export const DEPOSIT_MANA_SUCCESS = '[Success] Deposit MANA'
export const DEPOSIT_MANA_FAILURE = '[Failure] Deposit MANA'

export const depositManaRequest = (amount: number) =>
  action(DEPOSIT_MANA_REQUEST, { amount })
export const depositManaSuccess = (
  amount: number,
  chainId: ChainId,
  txHash: string
) =>
  action(DEPOSIT_MANA_SUCCESS, {
    amount,
    ...buildTransactionPayload(chainId, txHash, { amount }),
  })
export const depositManaFailure = (amount: number, error: string) =>
  action(DEPOSIT_MANA_FAILURE, { amount, error })

export type DepositManaRequestAction = ReturnType<typeof depositManaRequest>
export type DepositManaSuccessAction = ReturnType<typeof depositManaSuccess>
export type DepositManaFailureAction = ReturnType<typeof depositManaFailure>

// Watch Deposit Status
export const WATCH_DEPOSIT_STATUS_REQUEST = '[Request] Watch Deposit Status'
export const WATCH_DEPOSIT_STATUS_SUCCESS = '[Success] Watch Deposit Status'
export const WATCH_DEPOSIT_STATUS_FAILURE = '[Failure] Watch Deposit Status'
export const watchDepositStatusRequest = (amount: number, txHash: string) =>
  action(WATCH_DEPOSIT_STATUS_REQUEST, { amount, txHash })
export const watchDepositStatusSuccess = (deposit: Deposit) =>
  action(WATCH_DEPOSIT_STATUS_SUCCESS, { deposit })
export const watchDepositStatusFailure = (
  amount: number,
  txHash: string,
  error: string
) => action(WATCH_DEPOSIT_STATUS_FAILURE, { amount, txHash, error })
export type WatchDepositStatusRequestAction = ReturnType<
  typeof watchDepositStatusRequest
>
export type WatchDepositStatusSuccessAction = ReturnType<
  typeof watchDepositStatusSuccess
>
export type WatchDepositStatusFailureAction = ReturnType<
  typeof watchDepositStatusFailure
>

// Set Deposit Status
export const SET_DEPOSIT_STATUS = 'Set Deposit Status'
export const setDepositStatus = (txHash: string, status: DepositStatus) =>
  action(SET_DEPOSIT_STATUS, { txHash, status })
export type SetDepositStatusAction = ReturnType<typeof setDepositStatus>

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
  chainId: ChainId,
  txHash: string
) =>
  action(APPROVE_MANA_SUCCESS, {
    allowance,
    address,
    ...buildTransactionPayload(chainId, txHash, { allowance, address }),
  })
export const approveManaFailure = (allowance: string, error: string) =>
  action(APPROVE_MANA_FAILURE, { allowance, error })

export type ApproveManaRequestAction = ReturnType<typeof approveManaRequest>
export type ApproveManaSuccessAction = ReturnType<typeof approveManaSuccess>
export type ApproveManaFailureAction = ReturnType<typeof approveManaFailure>

// Transfer MANA
export const TRANSFER_MANA_REQUEST = '[Request] Transfer Mana'
export const TRANSFER_MANA_SUCCESS = '[Success] Transfer Mana'
export const TRANSFER_MANA_FAILURE = '[Failure] Transfer Mana'

export const transferManaRequest = (
  to: string,
  amount: number,
  network: Network
) => action(TRANSFER_MANA_REQUEST, { to, amount, network })

export const transferManaSuccess = (
  transfer: Transfer,
  chainId: ChainId,
  txHash: string
) =>
  action(TRANSFER_MANA_SUCCESS, {
    transfer,
    ...buildTransactionPayload(chainId, txHash, { transfer }),
  })
export const transferManaFailure = (
  to: string,
  amount: number,
  network: Network,
  error: string
) => action(TRANSFER_MANA_FAILURE, { to, amount, network, error })

export type TransferManaRequestAction = ReturnType<typeof transferManaRequest>
export type TransferManaSuccessAction = ReturnType<typeof transferManaSuccess>
export type TransferManaFailureAction = ReturnType<typeof transferManaFailure>

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

// Initialize Withdrawal
export const INITIATE_WITHDRAWAL_REQUEST = '[Request] Initiate Withdrawal'
export const INITIATE_WITHDRAWAL_SUCCESS = '[Success] Initiate Withdrawal'
export const INITIATE_WITHDRAWAL_FAILURE = '[Failure] Initiate Withdrawal'

export const initiateWithdrawalRequest = (amount: number) =>
  action(INITIATE_WITHDRAWAL_REQUEST, { amount })
export const initiateWithdrawalSuccess = (
  amount: number,
  chainId: ChainId,
  txHash: string
) =>
  action(INITIATE_WITHDRAWAL_SUCCESS, {
    amount,
    ...buildTransactionPayload(chainId, txHash, { amount }),
  })
export const initiateWithdrawalFailure = (amount: number, error: string) =>
  action(INITIATE_WITHDRAWAL_FAILURE, { amount, error })

export type InitiateWithdrawalRequestAction = ReturnType<
  typeof initiateWithdrawalRequest
>
export type InitiateWithdrawalSuccessAction = ReturnType<
  typeof initiateWithdrawalSuccess
>
export type InitiateWithdrawalFailureAction = ReturnType<
  typeof initiateWithdrawalFailure
>

// Watch Withdrawal Status
export const WATCH_WITHDRAWAL_STATUS_REQUEST =
  '[Request] Watch Withdrawal Status'
export const WATCH_WITHDRAWAL_STATUS_SUCCESS =
  '[Success] Watch Withdrawal Status'
export const WATCH_WITHDRAWAL_STATUS_FAILURE =
  '[Failure] Watch Withdrawal Status'
export const watchWithdrawalStatusRequest = (amount: number, txHash: string) =>
  action(WATCH_WITHDRAWAL_STATUS_REQUEST, { txHash, amount })
export const watchWithdrawalStatusSuccess = (withdrawal: Withdrawal) =>
  action(WATCH_WITHDRAWAL_STATUS_SUCCESS, { withdrawal })
export const watchWithdrawalStatusFailure = (
  amount: number,
  txHash: string,
  error: string
) => action(WATCH_WITHDRAWAL_STATUS_FAILURE, { amount, txHash, error })
export type WatchWithdrawalStatusRequestAction = ReturnType<
  typeof watchWithdrawalStatusRequest
>
export type WatchWithdrawalStatusSuccessAction = ReturnType<
  typeof watchWithdrawalStatusSuccess
>
export type WatchWithdrawalStatusFailureAction = ReturnType<
  typeof watchWithdrawalStatusFailure
>

// Set Withdrawal Status
export const SET_WITHDRAWAL_STATUS = 'Set Withdrawal Status'
export const setWithdrawalStatus = (txHash: string, status: WithdrawalStatus) =>
  action(SET_WITHDRAWAL_STATUS, { txHash, status })
export type SetWithdrawalStatusAction = ReturnType<typeof setWithdrawalStatus>

// Set Withdrawal Finalize Hash
export const SET_WITHDRAWAL_FINALIZE_HASH = 'Set Withdrawal Finalize Hash'
export const setWithdrawalFinalizeHash = (
  withdrawal: Withdrawal,
  finalizeHash: string
) => action(SET_WITHDRAWAL_FINALIZE_HASH, { withdrawal, finalizeHash })
export type SetWithdrawalFinalizeHashAction = ReturnType<
  typeof setWithdrawalFinalizeHash
>

// Import Withdrawal
export const IMPORT_WITHDRAWAL_REQUEST = '[Request] Import Withdrawal'
export const IMPORT_WITHDRAWAL_SUCCESS = '[Success] Import Withdrawal'
export const IMPORT_WITHDRAWAL_FAILURE = '[Failure] Import Withdrawal'

export const importWithdrawalRequest = (txHash: string) =>
  action(IMPORT_WITHDRAWAL_REQUEST, { txHash })
export const importWithdrawalSuccess = () => action(IMPORT_WITHDRAWAL_SUCCESS)
export const importWithdrawalFailure = (error: string) =>
  action(IMPORT_WITHDRAWAL_FAILURE, { error })

export type ImportWithdrawalRequestAction = ReturnType<
  typeof importWithdrawalRequest
>
export type ImportWithdrawalSuccessAction = ReturnType<
  typeof importWithdrawalSuccess
>
export type ImportWithdrawalFailureAction = ReturnType<
  typeof importWithdrawalFailure
>

// Finish Withdrawal
export const FINISH_WITHDRAWAL_REQUEST = '[Request] Finish Withdrawal'
export const FINISH_WITHDRAWAL_SUCCESS = '[Success] Finish Withdrawal'
export const FINISH_WITHDRAWAL_FAILURE = '[Failure] Finish Withdrawal'

export const finishWithdrawalRequest = (withdrawal: Withdrawal) =>
  action(FINISH_WITHDRAWAL_REQUEST, { withdrawal })
export const finishWithdrawalSuccess = (
  withdrawal: Withdrawal,
  chainId: ChainId,
  txHash: string
) =>
  action(FINISH_WITHDRAWAL_SUCCESS, {
    withdrawal,
    ...buildTransactionPayload(chainId, txHash, { withdrawal }),
  })
export const finishWithdrawalFailure = (
  withdrawal: Withdrawal,
  error: string
) => action(FINISH_WITHDRAWAL_FAILURE, { withdrawal, error })

export type FinishWithdrawalRequestAction = ReturnType<
  typeof finishWithdrawalRequest
>
export type FinishWithdrawalSuccessAction = ReturnType<
  typeof finishWithdrawalSuccess
>
export type FinishWithdrawalFailureAction = ReturnType<
  typeof finishWithdrawalFailure
>

export const CLEAR_MANA_ERROR = 'Clear Mana Error'
export const clearManaError = () => action(CLEAR_MANA_ERROR)
export type ClearManaErrorAction = ReturnType<typeof clearManaError>
