import {
  loadingReducer,
  LoadingState,
} from 'decentraland-dapps/dist/modules/loading/reducer'
import {
  FETCH_TRANSACTION_SUCCESS,
  FetchTransactionSuccessAction,
} from 'decentraland-dapps/dist/modules/transaction/actions'
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
  InitiateWithdrawalFailureAction,
  InitiateWithdrawalRequestAction,
  InitiateWithdrawalSuccessAction,
  INITIATE_WITHDRAWAL_FAILURE,
  INITIATE_WITHDRAWAL_REQUEST,
  INITIATE_WITHDRAWAL_SUCCESS,
  SetWithdrawalStatusAction,
  SET_WITHDRAWAL_STATUS,
  WatchWithdrawalStatusRequestAction,
  WatchWithdrawalStatusFailureAction,
  WatchWithdrawalStatusSuccessAction,
  WATCH_WITHDRAWAL_STATUS_SUCCESS,
  WATCH_WITHDRAWAL_STATUS_REQUEST,
  WATCH_WITHDRAWAL_STATUS_FAILURE,
  WatchDepositStatusRequestAction,
  WatchDepositStatusSuccessAction,
  WatchDepositStatusFailureAction,
  SetDepositStatusAction,
  WATCH_DEPOSIT_STATUS_REQUEST,
  WATCH_DEPOSIT_STATUS_SUCCESS,
  SET_DEPOSIT_STATUS,
  WATCH_DEPOSIT_STATUS_FAILURE,
  FINISH_WITHDRAWAL_REQUEST,
  FINISH_WITHDRAWAL_FAILURE,
  FINISH_WITHDRAWAL_SUCCESS,
  FinishWithdrawalFailureAction,
  FinishWithdrawalRequestAction,
  FinishWithdrawalSuccessAction,
} from './actions'
import { Deposit, Withdrawal, WithdrawalStatus } from './types'

export type ManaState = {
  data: {
    allowance: string
    price: number
    withdrawals: Withdrawal[]
    deposits: Deposit[]
  }
  loading: LoadingState
  error: string | null
}

const INITAL_STATE: ManaState = {
  data: {
    allowance: '-1',
    price: 0,
    withdrawals: [],
    deposits: [],
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
  | InitiateWithdrawalRequestAction
  | InitiateWithdrawalSuccessAction
  | InitiateWithdrawalFailureAction
  | WatchDepositStatusRequestAction
  | WatchDepositStatusSuccessAction
  | WatchDepositStatusFailureAction
  | SetDepositStatusAction
  | WatchWithdrawalStatusRequestAction
  | WatchWithdrawalStatusSuccessAction
  | WatchWithdrawalStatusFailureAction
  | SetWithdrawalStatusAction
  | FinishWithdrawalSuccessAction
  | FinishWithdrawalRequestAction
  | FinishWithdrawalFailureAction
  | FetchTransactionSuccessAction

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
    case INITIATE_WITHDRAWAL_REQUEST:
    case WATCH_DEPOSIT_STATUS_REQUEST:
    case WATCH_WITHDRAWAL_STATUS_REQUEST:
    case FINISH_WITHDRAWAL_REQUEST: {
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
    case INITIATE_WITHDRAWAL_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case WATCH_DEPOSIT_STATUS_SUCCESS: {
      const { deposit } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          deposits: [
            ...state.data.deposits.filter(
              (_deposit) => _deposit.hash !== deposit.hash
            ), // remove it if it was already added
            deposit,
          ],
        },
      }
    }

    case WATCH_WITHDRAWAL_STATUS_SUCCESS: {
      const { withdrawal } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        data: {
          ...state.data,
          withdrawals: [
            ...state.data.withdrawals.filter(
              (_withdraw) => _withdraw.hash !== withdrawal.hash
            ), // remove it if it was already added
            withdrawal,
          ],
        },
      }
    }

    case SET_DEPOSIT_STATUS: {
      const { txHash, status } = action.payload
      const deposit = state.data.deposits.find(
        (deposit) => deposit.hash === txHash
      )
      return deposit
        ? {
            ...state,
            data: {
              ...state.data,

              deposits: [
                // replace old tx with new one
                ...state.data.deposits.filter(
                  (_deposit) => deposit.hash !== _deposit.hash
                ),
                {
                  ...deposit,
                  status,
                },
              ],
            },
          }
        : state
    }

    case SET_WITHDRAWAL_STATUS: {
      const { txHash, status } = action.payload
      const withdrawal = state.data.withdrawals.find(
        (withdrawal) => withdrawal.hash === txHash
      )
      return withdrawal
        ? {
            ...state,
            data: {
              ...state.data,

              withdrawals: [
                // replace old tx with new one
                ...state.data.withdrawals.filter(
                  (_withdrawal) => withdrawal.hash !== _withdrawal.hash
                ),
                {
                  ...withdrawal,
                  status,
                },
              ],
            },
          }
        : state
    }

    case FINISH_WITHDRAWAL_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
      }
    }

    case FETCH_TRANSACTION_SUCCESS: {
      const { transaction } = action.payload
      switch (transaction.actionType) {
        case FINISH_WITHDRAWAL_SUCCESS: {
          const { withdrawal } = (transaction as any).payload
          return {
            ...state,
            data: {
              ...state.data,
              withdrawals: [
                ...state.data.withdrawals.filter(
                  (_withdraw) => _withdraw.hash !== withdrawal.hash
                ),
                {
                  ...withdrawal,
                  status: WithdrawalStatus.COMPLETE,
                },
              ],
            },
          }
        }
        default:
          return state
      }
    }

    case SEND_MANA_FAILURE:
    case FETCH_MANA_PRICE_FAILURE:
    case APPROVE_MANA_FAILURE:
    case GET_APPROVED_MANA_FAILURE:
    case DEPOSIT_MANA_FAILURE:
    case INITIATE_WITHDRAWAL_FAILURE:
    case WATCH_DEPOSIT_STATUS_FAILURE:
    case WATCH_WITHDRAWAL_STATUS_FAILURE:
    case FINISH_WITHDRAWAL_FAILURE: {
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
