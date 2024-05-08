import { NotificationType } from '@dcl/schemas'
import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { objectToCamel, toCamel } from 'ts-case-convert'
import { ToCamel } from 'ts-case-convert/lib/caseConvert'
import {
  GET_SUBSCRIPTIONS_FAILURE,
  GET_SUBSCRIPTIONS_REQUEST,
  GET_SUBSCRIPTIONS_SUCCESS,
  GetSubscriptionsFailureAction,
  GetSubscriptionsRequestAction,
  GetSubscriptionsSuccessAction,
  SAVE_SUBSCRIPTIONS_FAILURE,
  SAVE_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTIONS_SUCCESS,
  SaveSubscriptionsFailureAction,
  SaveSubscriptionsRequestAction,
  SaveSubscriptionsSuccessAction
} from './actions'
import { MessageTypeCamelCase, SubscriptionState } from './types'

const messageTypes: MessageTypeCamelCase = Object.values(NotificationType).reduce((properties, notificationType) => {
  properties[toCamel(notificationType) as ToCamel<NotificationType>] = { email: true, inApp: true }
  return properties
}, {} as MessageTypeCamelCase)

export const buildInitialState = (): SubscriptionState => ({
  subscriptionDetails: {
    ignoreAllEmail: true,
    ignoreAllInApp: false,
    messageType: messageTypes
  },
  email: '',
  loading: [],
  error: null
})

type SubscriptionReducerAction =
  | GetSubscriptionsRequestAction
  | GetSubscriptionsSuccessAction
  | GetSubscriptionsFailureAction
  | SaveSubscriptionsRequestAction
  | SaveSubscriptionsSuccessAction
  | SaveSubscriptionsFailureAction

export function subscriptionReducer(state = buildInitialState(), action: SubscriptionReducerAction): SubscriptionState {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_REQUEST:
    case SAVE_SUBSCRIPTIONS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_SUBSCRIPTIONS_SUCCESS: {
      const { details, email } = action.payload
      const newSubscriptionState = { subscriptionDetails: state.subscriptionDetails, email: state.email }
      newSubscriptionState.subscriptionDetails = objectToCamel(details)
      email && (newSubscriptionState.email = email)

      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        ...newSubscriptionState
      }
    }

    case SAVE_SUBSCRIPTIONS_SUCCESS: {
      const { subscriptionDetails } = action.payload

      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        subscriptionDetails: objectToCamel(subscriptionDetails)
      }
    }

    case GET_SUBSCRIPTIONS_FAILURE:
    case SAVE_SUBSCRIPTIONS_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error
      }
    }
  }
}
