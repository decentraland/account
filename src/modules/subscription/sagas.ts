import { Subscription } from '@dcl/schemas'
import { isErrorWithMessage } from 'decentraland-dapps/dist/lib/error'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTIONS_REQUEST,
  SaveSubscriptionsRequestAction,
  getSubscriptionsFailure,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsSuccess
} from './actions'

export function* subscriptionSagas(notificationsAPI: NotificationsAPI) {
  yield takeEvery(GET_SUBSCRIPTIONS_REQUEST, handleGetSubscriptionsRequest)
  yield takeEvery(SAVE_SUBSCRIPTIONS_REQUEST, handlePutSubscriptionsRequest)

  function* handleGetSubscriptionsRequest() {
    try {
      const subscription: Subscription = yield call([notificationsAPI, 'getSubscription'])

      yield put(getSubscriptionsSuccess(subscription))
    } catch (error) {
      yield put(getSubscriptionsFailure(isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }

  function* handlePutSubscriptionsRequest(action: SaveSubscriptionsRequestAction) {
    try {
      console.log('action > ', action)
      yield call([notificationsAPI, 'putSubscription'], action.payload.subscriptionDetails)
      console.log('after call')
      yield put(saveSubscriptionsSuccess(action.payload.subscriptionDetails))
    } catch (error) {
      console.log('error')
      yield put(saveSubscriptionsFailure(action.payload.prevSubscriptionDetails, isErrorWithMessage(error) ? error.message : 'Unknown'))
    }
  }
}
