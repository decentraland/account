import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { put, takeEvery } from 'redux-saga/effects'
import { IMPORT_WITHDRAWAL_SUCCESS } from '../mana/actions'

export function* modalSaga() {
  yield takeEvery(IMPORT_WITHDRAWAL_SUCCESS, handleImportWithdrawalSuccess)
}

function* handleImportWithdrawalSuccess() {
  yield put(closeModal('ImportWithdrawalModal'))
}
