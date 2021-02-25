import {
  loadingReducer,
  LoadingState,
} from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  ApproveManaFailureAction,
  ApproveManaRequestAction,
  ApproveManaSuccessAction,
  GetApprovedManaFailureAction,
  GetApprovedManaRequestAction,
  GetApprovedManaSuccessAction,
  APPROVE_MANA_FAILURE,
  APPROVE_MANA_REQUEST,
  APPROVE_MANA_SUCCESS,
  FetchManaPriceFailureAction,
  FetchManaPriceRequestAction,
  FetchManaPriceSuccessAction,
  FETCH_MANA_PRICE_FAILURE,
  FETCH_MANA_PRICE_REQUEST,
  FETCH_MANA_PRICE_SUCCESS,
  SendManaFailureAction,
  SendManaRequestAction,
  SendManaSuccessAction,
  SEND_MANA_FAILURE,
  SEND_MANA_REQUEST,
  SEND_MANA_SUCCESS,
  GET_APPROVED_MANA_REQUEST,
  GET_APPROVED_MANA_SUCCESS,
  GET_APPROVED_MANA_FAILURE,
  DepositManaRequestAction,
  DepositManaSuccessAction,
  DepositManaFailureAction,
  DEPOSIT_MANA_REQUEST,
  DEPOSIT_MANA_SUCCESS,
  DEPOSIT_MANA_FAILURE,
} from './actions'

export type ManaState = {
  data: {
    allowance: string
    price: number
  }
  loading: LoadingState
  error: string | null
}

const INITAL_STATE: ManaState = {
  data: {
    allowance: '-1',
    price: 0,
  },
  loading: [],
  error: null,
}

type ManaReducerAction =
  | SendManaRequestAction
  | SendManaSuccessAction
  | SendManaFailureAction
  | FetchManaPriceRequestAction
  | FetchManaPriceSuccessAction
  | FetchManaPriceFailureAction
  | ApproveManaRequestAction
  | ApproveManaSuccessAction
  | ApproveManaFailureAction
  | GetApprovedManaRequestAction
  | GetApprovedManaSuccessAction
  | GetApprovedManaFailureAction
  | DepositManaRequestAction
  | DepositManaSuccessAction
  | DepositManaFailureAction

export function manaReducer(state = INITAL_STATE, action: ManaReducerAction) {
  switch (action.type) {
    case SEND_MANA_REQUEST:
    case FETCH_MANA_PRICE_REQUEST:
    case APPROVE_MANA_REQUEST:
    case GET_APPROVED_MANA_REQUEST:
    case DEPOSIT_MANA_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case SEND_MANA_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case FETCH_MANA_PRICE_SUCCESS: {
      const { price } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          price,
        },
      }
    }

    case APPROVE_MANA_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case GET_APPROVED_MANA_SUCCESS: {
      const { allowance } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          allowance,
        },
      }
    }

    case DEPOSIT_MANA_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case SEND_MANA_FAILURE:
    case FETCH_MANA_PRICE_FAILURE:
    case APPROVE_MANA_FAILURE:
    case GET_APPROVED_MANA_FAILURE:
    case DEPOSIT_MANA_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error,
      }
    }

    default:
      return state
  }
}
