import { action } from 'typesafe-actions'

// Get MANA Approved
export const TRANSAK_ORDER_REQUEST = '[Request] Transak Order'
export const TRANSAK_ORDER_SUCCESS = '[Success] Transak Order'
export const TRANSAK_ORDER_FAILURE = '[Failure] Transak Order'

export const transakOrderRequest = (orderData: any) =>
  action(TRANSAK_ORDER_REQUEST, { orderData })
export const transakOrderSuccess = (orderData: any) =>
  action(TRANSAK_ORDER_SUCCESS, { orderData })
export const transakOrderFailure = (orderData: any) =>
  action(TRANSAK_ORDER_FAILURE, { orderData })

export type TransakOrderRequestAction = ReturnType<typeof transakOrderRequest>
export type TransakOrderSuccessAction = ReturnType<typeof transakOrderSuccess>
export type TransakOrderFailureAction = ReturnType<typeof transakOrderFailure>

// Open Transak
export const OPEN_TRANSAK = 'Open Transak'
export const openTransak = (network: 'matic' | 'ethereum') =>
  action(OPEN_TRANSAK, { network })
export type OpenTransakAction = ReturnType<typeof openTransak>
