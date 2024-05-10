import { Subscription, SubscriptionDetails } from '@dcl/schemas'
import { action } from 'typesafe-actions'

export const GET_SUBSCRIPTIONS_REQUEST = '[Request] Get Subscriptions'
export const GET_SUBSCRIPTIONS_SUCCESS = '[Success] Get Subscriptions'
export const GET_SUBSCRIPTIONS_FAILURE = '[Failure] Get Subscriptions'

export const getSubscriptionsRequest = () => action(GET_SUBSCRIPTIONS_REQUEST)
export const getSubscriptionsSuccess = (subscription: Subscription) =>
  action(GET_SUBSCRIPTIONS_SUCCESS, {
    ...subscription
  })
export const getSubscriptionsFailure = (error: string) => action(GET_SUBSCRIPTIONS_FAILURE, { error })

export type GetSubscriptionsRequestAction = ReturnType<typeof getSubscriptionsRequest>
export type GetSubscriptionsSuccessAction = ReturnType<typeof getSubscriptionsSuccess>
export type GetSubscriptionsFailureAction = ReturnType<typeof getSubscriptionsFailure>

export const SAVE_SUBSCRIPTIONS_REQUEST = '[Request] Save Subscriptions'
export const SAVE_SUBSCRIPTIONS_SUCCESS = '[Success] Save Subscriptions'
export const SAVE_SUBSCRIPTIONS_FAILURE = '[Failure] Save Subscriptions'

export const saveSubscriptionsRequest = (subscriptionDetails: SubscriptionDetails) =>
  action(SAVE_SUBSCRIPTIONS_REQUEST, { subscriptionDetails })
export const saveSubscriptionsSuccess = (subscriptionDetails: SubscriptionDetails) =>
  action(SAVE_SUBSCRIPTIONS_SUCCESS, { subscriptionDetails })
export const saveSubscriptionsFailure = (error: string) => action(SAVE_SUBSCRIPTIONS_FAILURE, { error })

export type SaveSubscriptionsRequestAction = ReturnType<typeof saveSubscriptionsRequest>
export type SaveSubscriptionsSuccessAction = ReturnType<typeof saveSubscriptionsSuccess>
export type SaveSubscriptionsFailureAction = ReturnType<typeof saveSubscriptionsFailure>
