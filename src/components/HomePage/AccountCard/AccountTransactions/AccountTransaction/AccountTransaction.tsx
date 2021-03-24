import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { distanceInWordsToNow } from 'decentraland-dapps/dist/lib/utils'
import {
  Deposit,
  Transfer,
  TransactionStatus,
  TransactionType,
  Withdrawal,
  WithdrawalStatus,
  Purchase,
} from '../../../../../modules/mana/types'
import {
  getStatusMessage,
  isPendingAccountTransaction,
} from '../../../../../modules/mana/utils'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'

const AccountTransaction = ({
  transaction,
  onTransactionDetail,
  onPendingWithdrawal,
  onPendingPurchase,
}: Props) => {
  const { type, status } = transaction

  const shortening = (address: string): string =>
    address ? `${address.slice(0, 4)}...${address.slice(-4)}` : ''

  let data: any = null
  let description = ''
  if (type === TransactionType.DEPOSIT) {
    description = t('transaction_description.deposit')
    data = transaction.data as Deposit
  } else if (type === TransactionType.WITHDRAWAL) {
    description = t('transaction_description.withdrawal')
    data = transaction.data as Withdrawal
  } else if (type === TransactionType.PURCHASE) {
    data = transaction.data as Purchase
    description = t('transaction_description.buy')
  } else if (type === TransactionType.TRANSFER) {
    data = transaction.data as Transfer
    description = `${t('transaction_description.send')} ${shortening(data.to)}`
  }

  let transactionLogo = ''
  if (data != null && isPendingAccountTransaction(type, status, data.status)) {
    if (type === TransactionType.DEPOSIT || type === TransactionType.PURCHASE) {
      transactionLogo = 'in-pending-transaction-logo'
    } else {
      transactionLogo = 'out-pending-transaction-logo'
    }
  } else if (
    type === TransactionType.DEPOSIT ||
    type === TransactionType.PURCHASE
  ) {
    transactionLogo = 'in-transaction-logo'
  } else if (
    type === TransactionType.WITHDRAWAL ||
    type === TransactionType.TRANSFER
  ) {
    transactionLogo = 'out-transaction-logo'
  } else if (status === TransactionStatus.REJECTED) {
    transactionLogo = 'rejected-transaction-logo'
  }

  const handleDetailModal = () => {
    if (
      type === TransactionType.WITHDRAWAL &&
      (data.status === WithdrawalStatus.PENDING ||
        data.status === WithdrawalStatus.CHECKPOINT)
    ) {
      onPendingWithdrawal(data.hash)
    } else if (
      type === TransactionType.PURCHASE &&
      status === TransactionStatus.PENDING
    ) {
      const { id, network } = data as Purchase
      onPendingPurchase(network, id)
    } else {
      onTransactionDetail(description, transaction)
    }
  }

  return (
    <div className="AccountTransaction" onClick={handleDetailModal}>
      <div className="type">
        <div className={`transaction-logo ${transactionLogo}`} />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div>
          {getStatusMessage(type, status, data.status)} -{' '}
          {distanceInWordsToNow(transaction.data.timestamp)}
        </div>
      </div>
      <div className="amount">{data?.amount}</div>
    </div>
  )
}

export default React.memo(AccountTransaction)
