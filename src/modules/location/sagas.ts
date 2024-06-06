import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction } from 'decentraland-dapps/dist/modules/wallet/actions'
import { History } from 'history'
import { getContext, takeEvery } from 'redux-saga/effects'
import { locations } from '../locations'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const history: History = yield getContext('history')
  const location = history.location
  const { pathname, search } = location
  if (pathname === locations.signIn()) {
    const redirectTo = new URLSearchParams(search).get('redirectTo')
    if (redirectTo) {
      history.push(decodeURIComponent(redirectTo))
    } else {
      history.push(locations.root())
    }
  }
}
