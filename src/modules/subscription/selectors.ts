import { isLoadingType } from 'decentraland-dapps/dist/modules/loading/selectors'
import { createSelector } from 'reselect'
import { RootState } from '../reducer'
import { GET_SUBSCRIPTIONS_REQUEST } from './actions'
import type { MessageTypeCamelCase } from './types'

const getState = (state: RootState) => state.subscription
const getLoading = (state: RootState) => getState(state).loading

export const getEmail = createSelector([getState], state => state.email)
export const hasEmail = createSelector([getEmail], email => email.length > 0)
export const getSubscriptionDetails = createSelector([getState], state => state.subscriptionDetails)
export const getError = createSelector([getState], state => state.error)
export const isIgnoringAllEmail = createSelector([getSubscriptionDetails], subscriptionDetails => subscriptionDetails.ignoreAllEmail)
export const isIgnoringAllInApp = createSelector([getSubscriptionDetails], subscriptionDetails => subscriptionDetails.ignoreAllInApp)
export const getSubscriptionByNotificationType = createSelector(
  [getSubscriptionDetails],
  subscriptionDetails => (notificationType: keyof MessageTypeCamelCase) => subscriptionDetails.messageType[notificationType]
)
export const isLoadingSubscriptions = createSelector([getLoading], loadingState => isLoadingType(loadingState, GET_SUBSCRIPTIONS_REQUEST))
