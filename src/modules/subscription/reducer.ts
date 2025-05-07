import { NotificationType } from '@dcl/schemas'
import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import { objectToCamel, toCamel } from 'ts-case-convert'
import { ToCamel } from 'ts-case-convert/lib/caseConvert'
import {
  CLEAR_SUBSCRIPTIONS_ERROR,
  ClearSaveSubscriptionErrorAction,
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
  VALIDATE_CREDITS_EMAIL_FAILURE,
  VALIDATE_CREDITS_EMAIL_REQUEST,
  VALIDATE_CREDITS_EMAIL_SUCCESS,
  VALIDATE_SUBSCRIPTION_EMAIL_FAILURE,
  VALIDATE_SUBSCRIPTION_EMAIL_REQUEST,
  VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS,
  ValidateCreditsEmailFailureAction,
  ValidateCreditsEmailRequestAction,
  ValidateCreditsEmailSuccessAction,
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
  error: null
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
  | ValidateCreditsEmailRequestAction
  | ValidateCreditsEmailSuccessAction
  | ValidateCreditsEmailFailureAction

export function subscriptionReducer(state = buildInitialState(), action: SubscriptionReducerAction): SubscriptionState {
  switch (action.type) {
    case GET_SUBSCRIPTIONS_REQUEST:
    case SAVE_SUBSCRIPTIONS_REQUEST:
    case SAVE_SUBSCRIPTION_EMAIL_REQUEST:
    case VALIDATE_SUBSCRIPTION_EMAIL_REQUEST:
    case VALIDATE_CREDITS_EMAIL_REQUEST: {
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
      let unconfirmedEmail: string | undefined = email
      if (state.email === email) {
        unconfirmedEmail = undefined
      }
      return {
        ...state,
        unconfirmedEmail,
        loading: loadingReducer(state.loading, action)
      }
    }
    case VALIDATE_SUBSCRIPTION_EMAIL_SUCCESS:
    case VALIDATE_CREDITS_EMAIL_SUCCESS: {
      return {
        ...state,
        unconfirmedEmail: undefined,
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_SUBSCRIPTIONS_FAILURE:
    case SAVE_SUBSCRIPTIONS_FAILURE:
    case SAVE_SUBSCRIPTION_EMAIL_FAILURE:
    case VALIDATE_SUBSCRIPTION_EMAIL_FAILURE:
    case VALIDATE_CREDITS_EMAIL_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }

    case CLEAR_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        error: null
      }
    }

    default:
      return state
  }
}
