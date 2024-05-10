import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { RootState } from '../reducer'
import { GET_SUBSCRIPTIONS_REQUEST } from './actions'
import type { MessageTypeCamelCase } from './types'

const getState = (state: RootState) => state.subscription

export const getLoading = (state: RootState) => getState(state).loading
export const getEmail = (state: RootState) => getState(state).email
export const hasEmail = (state: RootState) => getEmail(state).length > 0
export const getSubscriptionDetails = (state: RootState) => getState(state).subscriptionDetails
export const getError = (state: RootState) => getState(state).error
export const isIgnoringAllEmail = (state: RootState) => getSubscriptionDetails(state).ignoreAllEmail
export const isIgnoringAllInApp = (state: RootState) => getSubscriptionDetails(state).ignoreAllInApp
export const getSubscriptionByNotificationType = (state: RootState, notificationType: keyof MessageTypeCamelCase) =>
  getSubscriptionDetails(state).messageType[notificationType]
export const isLoadingSubscriptions = (state: RootState) => isLoadingType(getLoading(state), GET_SUBSCRIPTIONS_REQUEST)
