import { action } from 'typesafe-actions'
import { buildTransactionPayload } from 'decentraland-dapps/dist/modules/transaction/utils'

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
    address
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
    ...buildTransactionPayload(txHash, { to, amount })
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

// Deposit MANA
