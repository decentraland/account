import { SubscriptionDetails } from '@dcl/schemas'
import { action } from 'typesafe-actions'
import { SubscriptionFromClient } from './types'

export const GET_SUBSCRIPTIONS_REQUEST = '[Request] Get Subscriptions'
export const GET_SUBSCRIPTIONS_SUCCESS = '[Success] Get Subscriptions'
export const GET_SUBSCRIPTIONS_FAILURE = '[Failure] Get Subscriptions'

export const getSubscriptionsRequest = () => action(GET_SUBSCRIPTIONS_REQUEST)
export const getSubscriptionsSuccess = (subscription: SubscriptionFromClient) =>
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

export const CLEAR_SUBSCRIPTIONS_ERROR = 'Clear Subscriptions Error'
export const clearSaveSubscriptionError = () => action(CLEAR_SUBSCRIPTIONS_ERROR)

export type ClearSaveSubscriptionErrorAction = ReturnType<typeof clearSaveSubscriptionError>

export const SAVE_SUBSCRIPTION_EMAIL_REQUEST = '[Request] Save Subscription Email'
export const SAVE_SUBSCRIPTION_EMAIL_SUCCESS = '[Success] Save Subscription Email'
export const SAVE_SUBSCRIPTION_EMAIL_FAILURE = '[Failure] Save Subscription Email'

export const saveSubscriptionEmailRequest = (email: string) => action(SAVE_SUBSCRIPTION_EMAIL_REQUEST, { email })
export const saveSubscriptionEmailSuccess = (email: string) => action(SAVE_SUBSCRIPTION_EMAIL_SUCCESS, { email })
export const saveSubscriptionEmailFailure = (error: string) => action(SAVE_SUBSCRIPTION_EMAIL_FAILURE, { error })

export type SaveSubscriptionEmailRequestAction = ReturnType<typeof saveSubscriptionEmailRequest>
export type SaveSubscriptionEmailSuccessAction = ReturnType<typeof saveSubscriptionEmailSuccess>
export type SaveSubscriptionEmailFailureAction = ReturnType<typeof saveSubscriptionEmailFailure>

export const VALIDATE_SUBSCRIPTION_EMAIL_REQUEST = '[Request] Validate Subscription Email'
export const VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS = '[Success] Validate Subscription Email'
export const VALIDATE_SUBSCRIPTION_EMAIL_FAILURE = '[Failure] Validate Subscription Email'

export const validateSubscriptionEmailRequest = (validationBody: { address: string; code: string }) =>
  action(VALIDATE_SUBSCRIPTION_EMAIL_REQUEST, validationBody)
export const validateSubscriptionEmailSuccess = () => action(VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS)
export const validateSubscriptionEmailFailure = (error: string) => action(VALIDATE_SUBSCRIPTION_EMAIL_FAILURE, { error })

export type ValidateSubscriptionEmailRequestAction = ReturnType<typeof validateSubscriptionEmailRequest>
export type ValidateSubscriptionEmailSuccessAction = ReturnType<typeof validateSubscriptionEmailSuccess>
export type ValidateSubscriptionEmailFailureAction = ReturnType<typeof validateSubscriptionEmailFailure>

export const VALIDATE_CREDITS_EMAIL_REQUEST = '[Request] Validate Credits Email'
export const VALIDATE_CREDITS_EMAIL_SUCCESS = '[Success] Validate Credits Email'
export const VALIDATE_CREDITS_EMAIL_FAILURE = '[Failure] Validate Credits Email'

export const validateCreditsEmailRequest = (validationBody: { address: string; code: string }) =>
  action(VALIDATE_CREDITS_EMAIL_REQUEST, validationBody)
export const validateCreditsEmailSuccess = () => action(VALIDATE_CREDITS_EMAIL_SUCCESS)
export const validateCreditsEmailFailure = (error: string) => action(VALIDATE_CREDITS_EMAIL_FAILURE, { error })

export type ValidateCreditsEmailRequestAction = ReturnType<typeof validateCreditsEmailRequest>
export type ValidateCreditsEmailSuccessAction = ReturnType<typeof validateCreditsEmailSuccess>
export type ValidateCreditsEmailFailureAction = ReturnType<typeof validateCreditsEmailFailure>
