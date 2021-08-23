import { all, takeEvery, put } from 'redux-saga/effects'
import { Network } from '@dcl/schemas'
import { toastSaga as baseToastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { showToast } from 'decentraland-dapps/dist/modules/toast/actions'
import { getMetaTransactionFailureToast } from './toasts'
import {
  InitiateWithdrawalFailureAction,
  INITIATE_WITHDRAWAL_FAILURE,
  TransferManaFailureAction,
  TRANSFER_MANA_FAILURE,
} from '../mana/actions'

export function* toastSaga() {
  yield all([baseToastSaga(), customToastSaga()])
}

function* customToastSaga() {
  yield takeEvery(TRANSFER_MANA_FAILURE, handleTransferManaFailure)
  yield takeEvery(INITIATE_WITHDRAWAL_FAILURE, handleInitiateWithdrawalFailure)
}

function* handleTransferManaFailure(action: TransferManaFailureAction) {
  const { network, error } = action.payload

  if (network === Network.MATIC && !isUserDeniedSignature(error)) {
    yield put(showToast(getMetaTransactionFailureToast()))
  }
}

function* handleInitiateWithdrawalFailure(
  action: InitiateWithdrawalFailureAction
) {
  const { error } = action.payload
  if (!isUserDeniedSignature(error)) {
    yield put(showToast(getMetaTransactionFailureToast()))
  }
}

function isUserDeniedSignature(message: string) {
  // checking both for rejected signatures and transactions
  return /User (denied|rejected the) (transaction|message) signature/.test(
    message
  )
}
