import { getLocation, push } from 'connected-react-router'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction } from 'decentraland-dapps/dist/modules/wallet/actions'
import { put, select, takeEvery } from 'redux-saga/effects'
import { locations } from '../locations'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const location: ReturnType<typeof getLocation> = yield select(getLocation)
  const { pathname, search } = location
  if (pathname === locations.signIn()) {
    const redirectTo = new URLSearchParams(search).get('redirectTo')
    if (redirectTo) {
      yield put(push(decodeURIComponent(redirectTo)))
    } else {
      yield put(push(locations.root()))
    }
  }
}
