import { LOCATION_CHANGE } from 'connected-react-router'
import { closeAllModals, closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { ModalState } from 'decentraland-dapps/dist/modules/modal/reducer'
import { getOpenModals } from 'decentraland-dapps/dist/modules/modal/selectors'
import { delay, put, select, takeEvery } from 'redux-saga/effects'

import { IMPORT_WITHDRAWAL_SUCCESS } from '../mana/actions'

export function* modalSaga() {
  yield takeEvery(LOCATION_CHANGE, handleLocationChange)
  yield takeEvery(IMPORT_WITHDRAWAL_SUCCESS, handleImportWithdrawalSuccess)
}

function* handleLocationChange() {
  const openModals: ModalState = yield select(getOpenModals)
  if (Object.keys(openModals).length > 0) {
    yield delay(100)
    yield put(closeAllModals())
  }
}

function* handleImportWithdrawalSuccess() {
  yield put(closeModal('ImportWithdrawalModal'))
}
