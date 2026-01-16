import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { closeModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { CreditsSettingsAPI, UserStatusResponse } from '../../lib/api/credits'
import {
  GET_USER_CREDITS_STATUS_REQUEST,
  OPT_OUT_FROM_CREDITS_REQUEST,
  getUserCreditsStatusFailure,
  getUserCreditsStatusSuccess,
  optOutFromCreditsFailure,
  optOutFromCreditsSuccess
} from './actions'

export function* creditsSettingsSagas(creditsSettingsAPI: CreditsSettingsAPI) {
  yield takeEvery(GET_USER_CREDITS_STATUS_REQUEST, handleGetUserCreditsStatusRequest)
  yield takeEvery(OPT_OUT_FROM_CREDITS_REQUEST, handleOptOutFromCreditsRequest)

  function* handleGetUserCreditsStatusRequest() {
    try {
      const response: UserStatusResponse = yield call([creditsSettingsAPI, 'getUserStatus'])
      yield put(getUserCreditsStatusSuccess(response.status, response.optedOutAt))
    } catch (error) {
      yield put(getUserCreditsStatusFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handleOptOutFromCreditsRequest() {
    try {
      yield call([creditsSettingsAPI, 'optOut'])
      yield put(optOutFromCreditsSuccess())
      yield put(closeModal('OptOutConfirmationModal'))
    } catch (error) {
      yield put(optOutFromCreditsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
