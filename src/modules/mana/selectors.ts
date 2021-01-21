import { getData as getTransactions } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { createSelector } from 'reselect'
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from '../../components/HomePage/HomePage.types'
import { RootState } from '../reducer'

export const getState = (state: RootState) => state.mana
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getManaPrice = (state: RootState) => getData(state).price
export const getManaTransaction = createSelector(
  getAddress,
  getTransactions,
  (address, transactions) => {
    const myTransactions = transactions
      .filter(
        (tx) => tx.from === address && tx.actionType === 'DEPOSIT_MANA_SUCCESS' // todo: this should be the actual action
      )
      .map<Transaction>((tx) => {
        const { amount } = tx.payload
        return {
          amount,
          description: 'Deposit MANA',
          type: TransactionType.DEPOSIT,
          status: isPending(tx.status)
            ? TransactionStatus.PENDING
            : TransactionStatus.CONFIRMED,
        }
      })

    return myTransactions
  }
)
