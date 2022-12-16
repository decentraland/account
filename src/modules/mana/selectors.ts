import { createSelector } from 'reselect'
import { Network } from '@dcl/schemas'
import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'
import { getData as getTransactionsData } from 'decentraland-dapps/dist/modules/transaction/selectors'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import {
  Purchase,
  PurchaseStatus,
} from 'decentraland-dapps/dist/modules/mana/types'
import { getChainConfiguration } from 'decentraland-dapps/dist/lib/chainConfiguration'
import { RootState } from '../reducer'
import {
  APPROVE_MANA_SUCCESS,
  IMPORT_WITHDRAWAL_REQUEST,
  TransferManaSuccessAction,
  TRANSFER_MANA_SUCCESS,
} from './actions'
import {
  Transfer,
  Deposit,
  Withdrawal,
  Transaction as AccountTransaction,
  TransactionStatus as AccountTransactionStatus,
  TransactionType,
  DepositStatus,
  TransactionStatus,
} from './types'
import { mapStatus, mapStatusWithdrawal } from './utils'
import { ImportWithdrawalErrors } from './sagas'

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
export const getPurchases = (state: RootState) => getData(state).purchases

export const getWalletDeposits = createSelector<
  RootState,
  Deposit[],
  string | undefined,
  Deposit[]
>(getDeposits, getAddress, (deposits, address) =>
  address
    ? deposits.filter(
        (deposit) => deposit.from.toLowerCase() === address.toLowerCase()
      )
    : []
)

export const getWalletWithdrawals = createSelector<
  RootState,
  Withdrawal[],
  string | undefined,
  Withdrawal[]
>(getWithdrawals, getAddress, (withdrawals, address) =>
  address
    ? withdrawals.filter(
        (withdrawal) => withdrawal.from.toLowerCase() === address.toLowerCase()
      )
    : []
)

export const getTransactionByNetwork = createSelector<
  RootState,
  Transaction[],
  Deposit[],
  Withdrawal[],
  Purchase[],
  string | undefined,
  Record<Network, AccountTransaction[]>
>(
  getTransactionsData,
  getDeposits,
  getWithdrawals,
  getPurchases,
  getAddress,
  (transactions, deposits, withdrawals, purchases, walletAddress) => {
    const result: Record<Network, AccountTransaction[]> = {
      ETHEREUM: [],
      MATIC: [],
    }
    for (const tx of transactions.filter(
      (tx) => tx.from.toLowerCase() === walletAddress?.toLowerCase()
    )) {
      const { network } = getChainConfiguration(tx.chainId)
      const deposit = deposits.find((deposit) => tx.hash === deposit.hash)
      const withdrawal = withdrawals.find(
        (withdrawal) => tx.hash === withdrawal.initializeHash
      )
      if (deposit) {
        const accountTransaction: AccountTransaction<Deposit> = {
          hash: tx.hash,
          type: TransactionType.DEPOSIT,
          status:
            deposit.status === DepositStatus.PENDING
              ? AccountTransactionStatus.PENDING
              : mapStatus(tx.status),
          data: deposit,
          amount: deposit.amount,
          timestamp: tx.timestamp,
        }
        result[network].unshift(accountTransaction)
      } else if (withdrawal) {
        const accountTransaction: AccountTransaction<Withdrawal> = {
          hash: tx.hash,
          type: TransactionType.WITHDRAWAL,
          status: mapStatusWithdrawal(withdrawal.status),
          data: withdrawal,
          amount: withdrawal.amount,
          timestamp: tx.timestamp,
        }
        result[network].unshift(accountTransaction)
      } else {
        if (
          tx.actionType === TRANSFER_MANA_SUCCESS &&
          walletAddress &&
          tx.from === walletAddress
        ) {
          const payload = tx.payload as TransferManaSuccessAction['payload']
          const accountTransaction: AccountTransaction<Transfer> = {
            hash: tx.hash,
            type: TransactionType.TRANSFER,
            status: mapStatus(tx.status),
            data: payload.transfer,
            timestamp: tx.timestamp,
            amount: payload.transfer.amount,
          }
          result[network].unshift(accountTransaction)
        }
      }
    }

    const ONE_HOUR = 60 * 60 * 1000
    for (const purchase of purchases.filter(
      (purchase) =>
        purchase.address.toLowerCase() === walletAddress?.toLowerCase()
    )) {
      const accountTransaction: AccountTransaction<Purchase> = {
        hash: '',
        type: TransactionType.PURCHASE,
        status:
          purchase.status === PurchaseStatus.FAILED ||
          purchase.status === PurchaseStatus.CANCELLED ||
          (purchase.status === PurchaseStatus.PENDING &&
            purchase.timestamp + ONE_HOUR < Date.now())
            ? TransactionStatus.REJECTED
            : purchase.status === PurchaseStatus.COMPLETE
            ? TransactionStatus.CONFIRMED
            : TransactionStatus.PENDING,
        data: purchase,
        amount: purchase.amount,
        timestamp: purchase.timestamp,
      }
      result[purchase.network].unshift(accountTransaction)
    }

    result[Network.MATIC].sort(
      (t1, t2) => t2.data.timestamp - t1.data.timestamp
    )
    result[Network.ETHEREUM].sort(
      (t1, t2) => t2.data.timestamp - t1.data.timestamp
    )

    return result
  }
)

export const getWithdrawalImportError = createSelector<
  RootState,
  string | null,
  string | null
>(getError, (error) => {
  if (!error) {
    return null
  }

  const unformatedImportError = error.startsWith(IMPORT_WITHDRAWAL_REQUEST)
    ? error.split(' - ')[1]
    : null

  if (!unformatedImportError) {
    return null
  }

  let importError: string | null = null

  switch (unformatedImportError) {
    case ImportWithdrawalErrors.NOT_FOUND:
      importError = t('import_withdrawal_modal.errors.not_found')
      break
    case ImportWithdrawalErrors.NOT_WITHDRAWAL:
      importError = t('import_withdrawal_modal.errors.not_withdrawal')
      break
    case ImportWithdrawalErrors.NOT_OWN_TRANSACTION:
      importError = t('import_withdrawal_modal.errors.not_own_tx')
      break
    case ImportWithdrawalErrors.ALREADY_PROCESSED:
      importError = t('import_withdrawal_modal.errors.already_processed')
      break
    default:
      importError = unformatedImportError
  }

  return importError
})
