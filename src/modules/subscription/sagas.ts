import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTION_EMAIL_REQUEST,
  SaveSubscriptionEmailRequestAction,
  SaveSubscriptionsRequestAction,
  VALIDATE_SUBSCRIPTION_EMAIL_REQUEST,
  ValidateSubscriptionEmailRequestAction,
  getSubscriptionsFailure,
  getSubscriptionsSuccess,
  saveSubscriptionEmailFailure,
  saveSubscriptionEmailSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsSuccess,
  validateSubscriptionEmailFailure,
  validateSubscriptionEmailSuccess
} from './actions'
import { SubscriptionFromClient } from './types'

export function* subscriptionSagas(notificationsAPI: NotificationsAPI) {
  yield takeEvery(GET_SUBSCRIPTIONS_REQUEST, handleGetSubscriptionsRequest)
  yield takeEvery(SAVE_SUBSCRIPTIONS_REQUEST, handlePutSubscriptionsRequest)
  yield takeEvery(SAVE_SUBSCRIPTION_EMAIL_REQUEST, handlePutSubscriptionEmailRequest)
  yield takeEvery(VALIDATE_SUBSCRIPTION_EMAIL_REQUEST, handlePostValidationCodeRequest)

  function* handleGetSubscriptionsRequest() {
    try {
      const subscription: SubscriptionFromClient = yield call([notificationsAPI, 'getSubscription'])

      yield put(getSubscriptionsSuccess(subscription))
    } catch (error) {
      yield put(getSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePutSubscriptionsRequest(action: SaveSubscriptionsRequestAction) {
    try {
      yield call([notificationsAPI, 'putSubscription'], action.payload.subscriptionDetails)
      yield put(saveSubscriptionsSuccess(action.payload.subscriptionDetails))
    } catch (error) {
      yield put(saveSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePutSubscriptionEmailRequest(action: SaveSubscriptionEmailRequestAction) {
    try {
      yield call([notificationsAPI, 'putEmail'], action.payload.email)
      yield put(saveSubscriptionEmailSuccess(action.payload.email))
    } catch (error) {
      yield put(saveSubscriptionEmailFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePostValidationCodeRequest(action: ValidateSubscriptionEmailRequestAction) {
    try {
      yield call([notificationsAPI, 'postEmailConfirmationCode'], action.payload)
      yield put(validateSubscriptionEmailSuccess())
    } catch (error) {
      yield put(validateSubscriptionEmailFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
