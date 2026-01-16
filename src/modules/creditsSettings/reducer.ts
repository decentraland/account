import { loadingReducer } from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  CLEAR_CREDITS_SETTINGS_ERROR,
  ClearCreditsSettingsErrorAction,
  GET_USER_CREDITS_STATUS_FAILURE,
  GET_USER_CREDITS_STATUS_REQUEST,
  GET_USER_CREDITS_STATUS_SUCCESS,
  GetUserCreditsStatusFailureAction,
  GetUserCreditsStatusRequestAction,
  GetUserCreditsStatusSuccessAction,
  OPT_OUT_FROM_CREDITS_FAILURE,
  OPT_OUT_FROM_CREDITS_REQUEST,
  OPT_OUT_FROM_CREDITS_SUCCESS,
  OptOutFromCreditsFailureAction,
  OptOutFromCreditsRequestAction,
  OptOutFromCreditsSuccessAction
} from './actions'
import { CreditsSettingsState, UserCreditsStatus } from './types'

export const buildInitialState = (): CreditsSettingsState => ({
  status: null,
  optedOutAt: null,
  loading: [],
  error: null
})

type CreditsSettingsReducerAction =
  | GetUserCreditsStatusRequestAction
  | GetUserCreditsStatusSuccessAction
  | GetUserCreditsStatusFailureAction
  | OptOutFromCreditsRequestAction
  | OptOutFromCreditsSuccessAction
  | OptOutFromCreditsFailureAction
  | ClearCreditsSettingsErrorAction

export function creditsSettingsReducer(state = buildInitialState(), action: CreditsSettingsReducerAction): CreditsSettingsState {
  switch (action.type) {
    case GET_USER_CREDITS_STATUS_REQUEST:
    case OPT_OUT_FROM_CREDITS_REQUEST: {
      return {
        ...state,
        error: null,
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_USER_CREDITS_STATUS_SUCCESS: {
      const { status, optedOutAt } = action.payload
      return {
        ...state,
        status,
        optedOutAt,
        loading: loadingReducer(state.loading, action)
      }
    }

    case OPT_OUT_FROM_CREDITS_SUCCESS: {
      return {
        ...state,
        status: UserCreditsStatus.OPTED_OUT,
        optedOutAt: new Date().toISOString(),
        loading: loadingReducer(state.loading, action)
      }
    }

    case GET_USER_CREDITS_STATUS_FAILURE:
    case OPT_OUT_FROM_CREDITS_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }

    case CLEAR_CREDITS_SETTINGS_ERROR: {
      return {
        ...state,
        error: null
      }
    }

    default:
      return state
  }
}
