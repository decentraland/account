import { NotificationType } from '@dcl/schemas'
import { RootState } from '../reducer'
import { getSubscriptionsRequest } from './actions'
import { buildInitialState } from './reducer'
import {
  getEmail,
  getSubscriptionByNotificationType,
  getSubscriptionDetails,
  hasEmail,
  isIgnoringAllEmail,
  isIgnoringAllInApp,
  isLoadingSubscriptions
} from './selectors'
import { MessageTypeCamelCase, SubscriptionState } from './types'
import { toSnakeCase } from './utils'

let subscription: SubscriptionState

let state: RootState

beforeEach(() => {
  subscription = buildInitialState()
  state = {
    subscription: subscription
  } as RootState
})

describe('when selecting the email', () => {
  it('should return the email from the state', () => {
    expect(getEmail(state)).toBe(subscription.email)
  })
})

describe('when asking whether the state has email', () => {
  describe('and the state doesn`t have an email', () => {
    it('should return false', () => {
      expect(hasEmail(state)).toBe(false)
    })
  })
  describe('and the state has an email', () => {
    it('should return true', () => {
      expect(hasEmail({ ...state, subscription: { ...subscription, email: 'example@mail.com' } })).toBe(true)
    })
  })
})

describe('when selecting the subscription', () => {
  it('should return the subscription from the state', () => {
    expect(getSubscriptionDetails(state)).toBe(subscription.subscriptionDetails)
  })
})

describe('when asking whether the state is ignoring all email', () => {
  describe('and the state is ignoring all email', () => {
    it('should return true', () => {
      expect(isIgnoringAllEmail(state)).toBe(true)
    })
  })
  describe('and the state is not ignoring all email', () => {
    it('should return false', () => {
      expect(
        isIgnoringAllEmail({
          ...state,
          subscription: {
            ...subscription,
            subscriptionDetails: { ...subscription.subscriptionDetails, ignoreAllEmail: false }
          }
        })
      ).toBe(false)
    })
  })
})

describe('when asking whether the state is ignoring all in-app notifications', () => {
  describe('and the state is ignoring all in-app notifications', () => {
    it('should return true', () => {
      expect(
        isIgnoringAllInApp({
          ...state,
          subscription: {
            ...subscription,
            subscriptionDetails: { ...subscription.subscriptionDetails, ignoreAllInApp: true }
          }
        })
      ).toBe(true)
    })
  })
  describe('and the state is not ignoring all in-app notifications', () => {
    it('should return false', () => {
      expect(isIgnoringAllInApp(state)).toBe(false)
    })
  })
})

describe('when selecting the subscription setting by notification type', () => {
  it('should return the setting for the given notification type', () => {
    const getSetting = getSubscriptionByNotificationType(state)
    const notificationType = toSnakeCase(NotificationType.BID_ACCEPTED) as keyof MessageTypeCamelCase
    expect(getSetting(notificationType)).toBe(subscription.subscriptionDetails.messageType[notificationType])
  })
})

describe('when asking whether the state is loading subscriptions', () => {
  describe('and the state is loading subscriptions', () => {
    beforeEach(() => {
      state.subscription.loading = [getSubscriptionsRequest()]
    })
    it('should return true', () => {
      expect(isLoadingSubscriptions(state)).toBe(true)
    })
  })
  describe('and the state is not loading subscriptions', () => {
    it('should return false', () => {
      expect(isLoadingSubscriptions(state)).toBe(false)
    })
  })
})
