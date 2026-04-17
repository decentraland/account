/**
 * Wallet action types and creators.
 * These bridge between @dcl/core-web3 wallet events and the app's saga system.
 */

// The @dcl/core-web3 walletActions.setAccount dispatches 'wallet/setAccount'
// We listen for this in sagas to know when a wallet connects
export const CONNECT_WALLET_SUCCESS = 'wallet/setAccount'

export type ConnectWalletSuccessAction = {
  type: typeof CONNECT_WALLET_SUCCESS
  payload: string | null
}

export const FETCH_WALLET_REQUEST = '[Request] Fetch Wallet'
export const fetchWalletRequest = () => ({ type: FETCH_WALLET_REQUEST })
