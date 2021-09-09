import { Network } from '@dcl/schemas'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import {
  transactionReducer as baseTransactionReducer,
  TransactionReducerAction as BaseTransactionReducerAction,
} from 'decentraland-dapps/dist/modules/transaction/reducer'
import { TransactionStatus } from 'decentraland-dapps/dist/modules/transaction/types'
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
      const { txHash, address, nonce, actionType } = action.payload

      return {
        ...state,
        data: state.data.concat([
          {
            chainId: getChainIdByNetwork(Network.MATIC),
            hash: txHash,
            from: address,
            status: TransactionStatus.CONFIRMED,
            timestamp: Date.now(),
            replacedBy: null,
            actionType,
            events: [],
            nonce: nonce,
          },
        ]),
      }
    default:
      return baseTransactionReducer(state, action)
  }
}
