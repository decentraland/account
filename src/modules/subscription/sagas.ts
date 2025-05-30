import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { History } from 'history'
import { call, getContext, put, takeEvery } from 'redux-saga/effects'
import { locations } from '../locations'
import {
  GET_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTION_EMAIL_REQUEST,
  SaveSubscriptionEmailRequestAction,
  SaveSubscriptionsRequestAction,
  VALIDATE_CREDITS_EMAIL_REQUEST,
  VALIDATE_EMAIL_WITH_TURNSTILE_REQUEST,
  VALIDATE_SUBSCRIPTION_EMAIL_REQUEST,
  ValidateEmailWithTurnstileRequestAction,
  ValidateSubscriptionEmailRequestAction,
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionEmailFailure,
  saveSubscriptionEmailSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsSuccess,
  validateCreditsEmailFailure,
  validateCreditsEmailRequest,
  validateCreditsEmailSuccess,
  validateEmailWithTurnstileFailure,
  validateEmailWithTurnstileSuccess,
  validateSubscriptionEmailFailure,
  validateSubscriptionEmailSuccess
} from './actions'
import { SubscriptionFromClient } from './types'

type ValidateCreditsEmailRequestAction = ReturnType<typeof validateCreditsEmailRequest>

export function* subscriptionSagas(notificationsAPI: NotificationsAPI) {
  yield takeEvery(GET_SUBSCRIPTIONS_REQUEST, handleGetSubscriptionsRequest)
  yield takeEvery(SAVE_SUBSCRIPTIONS_REQUEST, handlePutSubscriptionsRequest)
  yield takeEvery(SAVE_SUBSCRIPTION_EMAIL_REQUEST, handlePutSubscriptionEmailRequest)
  yield takeEvery(VALIDATE_SUBSCRIPTION_EMAIL_REQUEST, handlePostValidationCodeRequest)
  yield takeEvery(VALIDATE_CREDITS_EMAIL_REQUEST, handlePostCreditsValidationCodeRequest)
  yield takeEvery(VALIDATE_EMAIL_WITH_TURNSTILE_REQUEST, handlePostEmailValidationWithTurnstileRequest)

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
    const history: History = yield getContext('history')
    try {
      yield call([notificationsAPI, 'postEmailConfirmationCode'], action.payload)
      yield put(validateSubscriptionEmailSuccess())
      yield put(getSubscriptionsRequest())
      history.push(locations.root(), { hasConfirmEmail: true, defaultTab: 1 })
    } catch (error) {
      history.push(locations.root())
      yield put(validateSubscriptionEmailFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePostCreditsValidationCodeRequest(action: ValidateCreditsEmailRequestAction) {
    try {
      yield call([notificationsAPI, 'postEmailConfirmationCode'], action.payload)
      yield put(validateCreditsEmailSuccess())
    } catch (error) {
      yield put(validateCreditsEmailFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePostEmailValidationWithTurnstileRequest(action: ValidateEmailWithTurnstileRequestAction) {
    const { source } = action.payload

    try {
      // Call the backend with both email confirmation code and Turnstile token
      yield call([notificationsAPI, 'postEmailConfirmationCode'], action.payload)

      yield put(validateEmailWithTurnstileSuccess(source))

      // Refresh subscriptions for account flow but don't redirect automatically
      if (source === 'account') {
        yield put(getSubscriptionsRequest())
      }
      // Both flows now stay on the confirmation page to show success
    } catch (error) {
      yield put(validateEmailWithTurnstileFailure(isErrorWithMessage(error) ? error.message : 'Unknown', source))
      // No automatic redirects on error - users stay on confirmation page
    }
  }
}
