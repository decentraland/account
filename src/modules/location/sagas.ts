import { takeEvery } from 'redux-saga/effects'
import { locations } from '../locations'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction } from '../wallet/actions'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  // Only redirect if we have an address (not on disconnect)
  if (!action.payload) return

  const { pathname, search } = window.location
  // Account for basename
  const basePath = pathname.replace(/^\/account/, '')
  if (basePath === locations.signIn() || basePath === '/sign-in') {
    const redirectTo = new URLSearchParams(search).get('redirectTo')
    if (redirectTo) {
      window.location.href = decodeURIComponent(redirectTo)
    } else {
      window.location.href = locations.root()
    }
  }
}
