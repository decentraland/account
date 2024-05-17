import { call } from '@redux-saga/core/effects'
import { NotificationsAPI } from 'decentraland-dapps/dist/modules/notifications'
import { expectSaga } from 'redux-saga-test-plan'
import { objectToSnake } from 'ts-case-convert'
import {
  getSubscriptionsFailure,
  getSubscriptionsRequest,
  getSubscriptionsSuccess,
  saveSubscriptionEmailFailure,
  saveSubscriptionEmailRequest,
  saveSubscriptionEmailSuccess,
  saveSubscriptionsFailure,
  saveSubscriptionsRequest,
  saveSubscriptionsSuccess,
  validateSubscriptionEmailFailure,
  validateSubscriptionEmailRequest,
  validateSubscriptionEmailSuccess
} from './actions'
import { buildInitialState } from './reducer'
import { subscriptionSagas } from './sagas'
import { SubscriptionFromClient } from './types'

let notificationsAPI: NotificationsAPI
let walletAddress: string
let subscriptionSettings: SubscriptionFromClient
let unconfirmedEmail: string
const subscriptionSettingsState = buildInitialState()

beforeEach(() => {
  walletAddress = 'testUser'
  unconfirmedEmail = 'example@decentraland.org'
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
  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save subscription for ${walletAddress}`
    })

    it('should put a save subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], subscriptionSettings.details), Promise.reject(new Error(errorMessage))]])
        .put(saveSubscriptionsFailure(errorMessage))
        .dispatch(saveSubscriptionsRequest(subscriptionSettings.details))
        .silentRun()
    })
  })

  describe('and the notification API call is successful', () => {
    it('should put a save subscription success action with the subscription', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putSubscription'], subscriptionSettings.details), Promise.resolve(subscriptionSettings)]])
        .put(saveSubscriptionsSuccess(subscriptionSettings.details))
        .dispatch(saveSubscriptionsRequest(subscriptionSettings.details))
        .silentRun()
    })
  })
})

describe('when handling the request action to save the subscription`s email', () => {
  describe('and the notification API call fails', () => {
    let errorMessage: string

    beforeEach(() => {
      errorMessage = `Failed to save email ${unconfirmedEmail}`
    })

    it('should put a save subscription failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putEmail'], unconfirmedEmail), Promise.reject(new Error(errorMessage))]])
        .put(saveSubscriptionEmailFailure(errorMessage))
        .dispatch(saveSubscriptionEmailRequest(unconfirmedEmail))
        .silentRun()
    })
  })

  describe('and the notification API call is successful', () => {
    it('should put a save subscription success action with the email', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'putEmail'], unconfirmedEmail), Promise.resolve(subscriptionSettings)]])
        .put(saveSubscriptionEmailSuccess(unconfirmedEmail))
        .dispatch(saveSubscriptionEmailRequest(unconfirmedEmail))
        .silentRun()
    })
  })
})

describe('when handling the request action to validate the subscription`s email', () => {
  let errorMessage: string
  let validationBody: {
    address: string
    code: string
  }
  beforeEach(() => {
    errorMessage = `Failed to validate email ${unconfirmedEmail}`
    validationBody = {
      address: unconfirmedEmail,
      code: '123456'
    }
  })
  describe('and the notification API call fails', () => {
    it('should put a validate subscription email failure action with the error', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([[call([notificationsAPI, 'postEmailConfirmationCode'], validationBody), Promise.reject(new Error(errorMessage))]])
        .put(validateSubscriptionEmailFailure(errorMessage))
        .dispatch(validateSubscriptionEmailRequest(validationBody))
        .silentRun()
    })
  })

  describe('and the notification API call is successful', () => {
    it('should put the validate the subscription email success action', () => {
      return expectSaga(subscriptionSagas, notificationsAPI)
        .provide([
          [
            call([notificationsAPI, 'postEmailConfirmationCode'], validationBody),
            Promise.resolve({ ...subscriptionSettings, address: unconfirmedEmail })
          ]
        ])
        .put(getSubscriptionsRequest())
        .put(validateSubscriptionEmailSuccess())
        .dispatch(validateSubscriptionEmailRequest(validationBody))
        .silentRun()
    })
  })
})
