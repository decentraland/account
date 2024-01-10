import { takeEvery, put, select, delay } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { getOpenModals } from 'decentraland-dapps/dist/modules/modal/selectors'
import { ModalState } from 'decentraland-dapps/dist/modules/modal/reducer'
import { IMPORT_WITHDRAWAL_SUCCESS } from '../mana/actions'
import {
  closeAllModals,
  closeModal,
} from 'decentraland-dapps/dist/modules/modal/actions'

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
