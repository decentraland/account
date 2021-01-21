import {
  loadingReducer,
  LoadingState,
} from 'decentraland-dapps/dist/modules/loading/reducer'
import {
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
} from './actions'

export type ManaState = {
  data: {
    price: number
  }
  loading: LoadingState
  error: string | null
}

const INITAL_STATE: ManaState = {
  data: {
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

export function manaReducer(state = INITAL_STATE, action: ManaReducerAction) {
  switch (action.type) {
    case SEND_MANA_REQUEST:
    case FETCH_MANA_PRICE_REQUEST: {
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

    case SEND_MANA_FAILURE:
    case FETCH_MANA_PRICE_FAILURE: {
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
