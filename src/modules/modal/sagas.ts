import { put, takeEvery } from '@redux-saga/core/effects'
import { getOpenModals } from 'decentraland-dapps/dist/modules/modal/selectors'
import { IMPORT_WITHDRAWAL_SUCCESS } from '../mana/actions'

import { history, store } from '../store'
import { closeAllModals, closeModal } from './actions'

export function* modalSaga() {
  // Can't use generators inside the history listen callback
  history.listen(() => handleURLChange())
  yield takeEvery(IMPORT_WITHDRAWAL_SUCCESS, handleImportWithdrawalSuccess)
}

function handleURLChange() {
  const openModals = getOpenModals(store.getState())

  if (Object.keys(openModals).length > 1) {
    // Move the dispatch to the end of the queue to avoid conflicting with other running sagas
    setTimeout(() => store.dispatch(closeAllModals()))
  }
}

function* handleImportWithdrawalSuccess() {
  yield put(closeModal('ImportWithdrawalModal'))
}
