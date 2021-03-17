import React from 'react'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'
import {
  TransactionStatus,
  TransactionType,
} from '../../../../../modules/mana/types'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

const AccountTransaction = ({
  transaction,
  onTransactionDetail,
  onPendingWithDrawal,
}: Props) => {
  const { amount, type, status, to } = transaction
  const shortening = (address: string): string =>
    `${address.slice(0, 4)}...${address.slice(-4)}`

  let description = ''
  if (type === TransactionType.DEPOSIT) {
    description = t('transaction_description.deposit')
  } else if (type === TransactionType.WITHDRAWAL) {
    description = t('transaction_description.withdrawal')
  } else if (type === TransactionType.BUY) {
    description = t('transaction_description.buy')
  } else if (type === TransactionType.SEND) {
    description = `${t('transaction_description.send')} ${shortening(to)}`
  }

  let transactionLogo = ''
  if (type === TransactionType.DEPOSIT || type === TransactionType.BUY) {
    transactionLogo = 'in-transaction-logo'
  } else if (
    type === TransactionType.WITHDRAWAL ||
    type === TransactionType.SEND
  ) {
    transactionLogo = 'out-transaction-logo'
  } else if (status === TransactionStatus.PENDING) {
    transactionLogo = 'pending-transaction-logo'
  } else if (status === TransactionStatus.REJECTED) {
    transactionLogo = 'rejected-transaction-logo'
  }

  return (
    <div
      className="AccountTransaction"
      onClick={() =>
        type === TransactionType.WITHDRAWAL &&
        status === TransactionStatus.PENDING
          ? onPendingWithDrawal(to)
          : onTransactionDetail(description, amount, status, type)
      }
    >
      <div className="type">
        <div className={`transaction-logo ${transactionLogo}`} />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div> {status} </div>
      </div>
      <div className="amount"> {amount} </div>
    </div>
  )
}

export default React.memo(AccountTransaction)
