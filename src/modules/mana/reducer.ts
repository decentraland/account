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
  WithdrawManaFailureAction,
  WithdrawManaRequestAction,
  WithdrawManaSuccessAction,
  WITHDRAW_MANA_FAILURE,
  WITHDRAW_MANA_REQUEST,
  WITHDRAW_MANA_SUCCESS,
  SetWithdrawTransactionStatusAction,
  SET_WITHDRAW_TRANSACTION_STATUS,
  WatchWithdrawTransactionRequestAction,
  WatchWithdrawTransactionFailureAction,
  WatchWithdrawTransactionSuccessAction,
  WATCH_WITHDRAW_TRANSACTION_SUCCESS,
  WATCH_WITHDRAW_TRANSACTION_REQUEST,
  WATCH_WITHDRAW_TRANSACTION_FAILURE,
} from './actions'
import { WithdrawTransaction } from './types'

export type ManaState = {
  data: {
    allowance: string
    price: number
  }
  loading: LoadingState
  error: string | null
  withdrawTransactions: WithdrawTransaction[]
}

const INITAL_STATE: ManaState = {
  data: {
    allowance: '-1',
    price: 0,
  },
  loading: [],
  error: null,
  withdrawTransactions: [],
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
  | WithdrawManaRequestAction
  | WithdrawManaSuccessAction
  | WithdrawManaFailureAction
  | WatchWithdrawTransactionRequestAction
  | WatchWithdrawTransactionSuccessAction
  | WatchWithdrawTransactionFailureAction
  | SetWithdrawTransactionStatusAction

export function manaReducer(
  state = INITAL_STATE,
  action: ManaReducerAction
): ManaState {
  switch (action.type) {
    case SEND_MANA_REQUEST:
    case FETCH_MANA_PRICE_REQUEST:
    case APPROVE_MANA_REQUEST:
    case GET_APPROVED_MANA_REQUEST:
    case DEPOSIT_MANA_REQUEST:
    case WITHDRAW_MANA_REQUEST:
    case WATCH_WITHDRAW_TRANSACTION_REQUEST: {
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

    case DEPOSIT_MANA_SUCCESS:
    case WITHDRAW_MANA_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case WATCH_WITHDRAW_TRANSACTION_SUCCESS: {
      const { tx } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        withdrawTransactions: [
          ...state.withdrawTransactions.filter((_tx) => _tx.hash !== tx.hash), // remove the tx if it was already added
          tx,
        ],
      }
    }

    case SET_WITHDRAW_TRANSACTION_STATUS: {
      const { txHash, status } = action.payload
      const tx = state.withdrawTransactions.find((tx) => tx.hash === txHash)
      return tx
        ? {
            ...state,
            withdrawTransactions: [
              // replace old tx with new one
              ...state.withdrawTransactions.filter(
                (_tx) => tx.hash !== _tx.hash
              ),
              {
                ...tx,
                status,
              },
            ],
          }
        : state
    }

    case SEND_MANA_FAILURE:
    case FETCH_MANA_PRICE_FAILURE:
    case APPROVE_MANA_FAILURE:
    case GET_APPROVED_MANA_FAILURE:
    case DEPOSIT_MANA_FAILURE:
    case WITHDRAW_MANA_FAILURE:
    case WATCH_WITHDRAW_TRANSACTION_FAILURE: {
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
