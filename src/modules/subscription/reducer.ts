import { NotificationType } from '@dcl/schemas'
import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { objectToCamel, toCamel } from 'ts-case-convert'
import { ToCamel } from 'ts-case-convert/lib/caseConvert'
import {
  CLEAR_SUBSCRIPTIONS_ERROR,
  CLEAR_SUBSCRIPTION_MAIL_APPROVAL,
  ClearSaveSubscriptionErrorAction,
  ClearSubscriptionMailApprovalAction,
  GET_SUBSCRIPTIONS_FAILURE,
  GET_SUBSCRIPTIONS_REQUEST,
  GET_SUBSCRIPTIONS_SUCCESS,
  GetSubscriptionsFailureAction,
  GetSubscriptionsRequestAction,
  GetSubscriptionsSuccessAction,
  SAVE_SUBSCRIPTIONS_FAILURE,
  SAVE_SUBSCRIPTIONS_REQUEST,
  SAVE_SUBSCRIPTIONS_SUCCESS,
  SAVE_SUBSCRIPTION_EMAIL_FAILURE,
  SAVE_SUBSCRIPTION_EMAIL_REQUEST,
  SAVE_SUBSCRIPTION_EMAIL_SUCCESS,
  SaveSubscriptionEmailFailureAction,
  SaveSubscriptionEmailRequestAction,
  SaveSubscriptionEmailSuccessAction,
  SaveSubscriptionsFailureAction,
  SaveSubscriptionsRequestAction,
  SaveSubscriptionsSuccessAction,
  VALIDATE_SUBSCRIPTION_EMAIL_FAILURE,
  VALIDATE_SUBSCRIPTION_EMAIL_REQUEST,
  VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS,
  ValidateSubscriptionEmailFailureAction,
  ValidateSubscriptionEmailRequestAction,
  ValidateSubscriptionEmailSuccessAction
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
  error: null,
  hasApprovedEmail: false
})

type SubscriptionReducerAction =
  | GetSubscriptionsRequestAction
  | GetSubscriptionsSuccessAction
  | GetSubscriptionsFailureAction
  | SaveSubscriptionsRequestAction
  | SaveSubscriptionsSuccessAction
  | SaveSubscriptionsFailureAction
  | ClearSaveSubscriptionErrorAction
  | SaveSubscriptionEmailRequestAction
  | SaveSubscriptionEmailSuccessAction
  | SaveSubscriptionEmailFailureAction
  | ValidateSubscriptionEmailRequestAction
  | ValidateSubscriptionEmailSuccessAction
  | ValidateSubscriptionEmailFailureAction
  | ClearSubscriptionMailApprovalAction

export function subscriptionReducer(state = buildInitialState(), action: SubscriptionReducerAction): SubscriptionState {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_REQUEST:
    case SAVE_SUBSCRIPTIONS_REQUEST:
    case SAVE_SUBSCRIPTION_EMAIL_REQUEST:
    case VALIDATE_SUBSCRIPTION_EMAIL_REQUEST: {
      return {
        ...state,
        error: null,
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_SUBSCRIPTIONS_SUCCESS: {
      const { details, email, unconfirmedEmail } = action.payload
      const newSubscriptionState = { ...state }
      newSubscriptionState.subscriptionDetails = objectToCamel(details)
      if (email) {
        newSubscriptionState.email = email
      }
      newSubscriptionState.unconfirmedEmail = unconfirmedEmail

      return {
        ...newSubscriptionState,
        loading: loadingReducer(state.loading, action)
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

    case SAVE_SUBSCRIPTION_EMAIL_SUCCESS: {
      const { email } = action.payload

      return {
        ...state,
        unconfirmedEmail: email,
        loading: loadingReducer(state.loading, action)
      }
    }
    case VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS: {
      const newEmail = state.unconfirmedEmail!
      return {
        ...state,
        email: newEmail,
        unconfirmedEmail: undefined,
        hasApprovedEmail: true,
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_SUBSCRIPTIONS_FAILURE:
    case SAVE_SUBSCRIPTIONS_FAILURE:
    case SAVE_SUBSCRIPTION_EMAIL_FAILURE:
    case VALIDATE_SUBSCRIPTION_EMAIL_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error
      }
    }

    case CLEAR_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        error: null
      }
    }
    case CLEAR_SUBSCRIPTION_MAIL_APPROVAL: {
      return {
        ...state,
        hasApprovedEmail: false
      }
    }
    default: {
      return state
    }
  }
}
