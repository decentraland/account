import { getLocation, push } from 'connected-react-router'
import { CONNECT_WALLET_SUCCESS, ConnectWalletSuccessAction } from 'decentraland-dapps/dist/modules/wallet/actions'
import { put, select, takeEvery } from 'redux-saga/effects'

import { locations } from '../locations'

export function* locationSaga() {
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

function* handleConnectWalletSuccess(_action: ConnectWalletSuccessAction) {
  const location: ReturnType<typeof getLocation> = yield select(getLocation)
  if (location.pathname === locations.signIn()) {
    yield put(push(locations.root()))
  }
}
