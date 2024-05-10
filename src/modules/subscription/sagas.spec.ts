import { Subscription } from '@dcl/schemas'
import { call } from '@redux-saga/core/effects'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { expectSaga } from 'redux-saga-test-plan'
import { objectToSnake } from 'ts-case-convert'
import {
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess
} from './actions'
import { buildInitialState } from './reducer'
import { subscriptionSagas } from './sagas'

let notificationsAPI: NotificationsAPI
let walletAddress: string
let subscriptionSettings: Subscription
const subscriptionSettingsState = buildInitialState()

beforeEach(() => {
  walletAddress = 'testUser'
  notificationsAPI = new NotificationsAPI({})

  subscriptionSettings = {
    email: subscriptionSettingsState.email,
    details: objectToSnake(subscriptionSettingsState.subscriptionDetails),
    address: walletAddress
  }
})

describe('when handling the request action to fetch the subscription', () => {
  describe('and the notification API call is successful', () => {
    it('should put a fetch subscription success action with the subscription', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscription']), Promise.resolve(subscriptionSettings)]])
        .put(getSubscriptionsSuccess(subscriptionSettings))
        .dispatch(getSubscriptionsRequest())
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to fetch subscription for ${walletAddress}`
    })

    it('should put a fetch subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'getSubscription']), Promise.reject(new Error(errorMessage))]])
        .put(getSubscriptionsFailure(errorMessage))
        .dispatch(getSubscriptionsRequest())
        .silentRun()
    })
  })
})

describe('when handling the request action to save the subscription', () => {
  let newSubscription: Subscription
  beforeEach(() => {
    newSubscription = {
      ...subscriptionSettings,
      details: {
        ...subscriptionSettings.details,
        message_type: { ...subscriptionSettings.details.message_type, bid_accepted: { in_app: false, email: false } }
      }
    }
  })
  describe('and the notification API call is successful', () => {
    it('should put a save subscription success action with the subscription', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], newSubscription.details), Promise.resolve(newSubscription)]])
        .put(saveSubscriptionsSuccess(newSubscription.details))
        .dispatch(saveSubscriptionsRequest(newSubscription.details, subscriptionSettings.details))
        .silentRun()
    })
  })

  describe('and the notification API call fails', () => {
    let errorMessage: string
    beforeEach(() => {
      errorMessage = `Failed to save subscription for ${walletAddress}`
    })

    it('should put a save subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], newSubscription.details), Promise.reject(new Error(errorMessage))]])
        .put(saveSubscriptionsFailure(subscriptionSettings.details, errorMessage))
        .dispatch(saveSubscriptionsRequest(newSubscription.details, subscriptionSettings.details))
        .silentRun()
    })
  })
})
