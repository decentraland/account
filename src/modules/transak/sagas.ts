import {
  ConnectWalletSuccessAction,
  CONNECT_WALLET_SUCCESS,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { call, select, takeEvery } from 'redux-saga/effects'
import { store } from '../store'
import {
  OPEN_TRANSAK,
  OpenTransakAction,
  // TransakOrderRequestAction,
  // TRANSAK_ORDER_REQUEST,
} from './actions'
import { initializeTransak, openTransakWidget } from './utils'

export function* transakSaga() {
  // yield takeEvery(TRANSAK_ORDER_REQUEST, handleTransakInit)
  yield takeEvery(OPEN_TRANSAK, handleOpenTransak)
  yield takeEvery(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
}

// function* handleTransakInit(_action: TransakOrderRequestAction) {
//   yield call(() => console.log('transak init'))
// }

function* handleOpenTransak(action: OpenTransakAction) {
  const { network } = action.payload
  const address: string = yield select(getAddress)
  openTransakWidget(address, network)
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield call(() => {
    initializeTransak(store, action.payload.wallet.address)
  })
}
