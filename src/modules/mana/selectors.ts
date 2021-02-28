import { RootState } from '../reducer'
import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import { APPROVE_MANA_SUCCESS } from './actions'
import { createSelector } from 'reselect'

import { getData as getTransactionsData } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { Deposit, Withdrawal } from './types'

export const getState = (state: RootState) => state.mana
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getManaPrice = (state: RootState) => getData(state).price
export const getAllowance = (state: RootState) => getData(state).allowance

export const isEqual = (addr1: string, addr2: string) => {
  return addr1.toLowerCase() === addr2.toLowerCase()
}

export const getTransactionsByType = (
  state: RootState,
  address: string,
  type: string
): Transaction[] =>
  getTransactionsData(state).filter(
    (tx) => isEqual(tx.from, address) && tx.actionType === type
  )

export const getTransactions = createSelector<
  RootState,
  Transaction[],
  string | undefined,
  Transaction[]
>(getTransactionsData, getAddress, (transactions, address) =>
  transactions.filter(
    (transaction) => !!address && isEqual(transaction.from, address)
  )
)

export const getPendingTransactions = createSelector<
  RootState,
  Transaction[],
  Transaction[]
>(getTransactions, (transactions) =>
  transactions.filter((transaction) => isPending(transaction.status))
)
export const isWaitingForApproval = createSelector<
  RootState,
  Transaction[],
  boolean
>(getPendingTransactions, (transactions) =>
  transactions.some(
    (transaction) => APPROVE_MANA_SUCCESS === transaction.actionType
  )
)

export const getDeposits = (state: RootState) => getData(state).deposits
export const getWithdrawals = (state: RootState) => getData(state).withdrawals

export const getWalletDeposits = createSelector<
  RootState,
  Deposit[],
  string | undefined,
  Deposit[]
>(getDeposits, getAddress, (deposits, address) =>
  address ? deposits.filter((deposit) => deposit.from === address) : []
)

export const getWalletWithdrawals = createSelector<
  RootState,
  Withdrawal[],
  string | undefined,
  Withdrawal[]
>(getWithdrawals, getAddress, (withdrawals, address) =>
  address ? withdrawals.filter((withdrawal) => withdrawal.from === address) : []
)
