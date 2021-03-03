import { call, takeEvery } from 'redux-saga/effects'
import { TransakOrderRequestAction, TRANSAK_ORDER_REQUEST } from './actions'

export function* transakSaga() {
  yield takeEvery(TRANSAK_ORDER_REQUEST, handleTransakInit)
}

function* handleTransakInit(_action: TransakOrderRequestAction) {
  yield call(() => console.log('transak init'))
}
