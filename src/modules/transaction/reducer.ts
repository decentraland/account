import {
  transactionReducer as baseTransactionReducer,
  TransactionReducerAction as BaseTransactionReducerAction,
} from 'decentraland-dapps/dist/modules/transaction/reducer'
import { InsertTransactionAction, INSERT_TRANSACTION } from './action'

export type TransactionReducerAction =
  | BaseTransactionReducerAction
  | InsertTransactionAction

const INITIAL_STATE = { data: [], loading: [], error: null }

export const transactionReducer = (
  state: Parameters<typeof baseTransactionReducer>[0] = INITIAL_STATE,
  action: TransactionReducerAction
) => {
  switch (action.type) {
    case INSERT_TRANSACTION:
      const { transaction } = action.payload

      return {
        ...state,
        data: state.data.concat([transaction]),
      }
    default:
      return baseTransactionReducer(state, action)
  }
}
