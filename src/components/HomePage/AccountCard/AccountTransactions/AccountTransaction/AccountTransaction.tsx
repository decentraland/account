import React from 'react'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'
import {
  TransactionStatus,
  TransactionType,
} from '../../../../../modules/mana/types'

const AccountTransaction = ({ transaction, onTransactionDetail }: Props) => {
  const { amount, type, status, description } = transaction
  return (
    <div
      className="AccountTransaction"
      onClick={() => onTransactionDetail(description, amount, status, type)}
    >
      <div className="type">
        <div
          className={`transaction-logo ${
            type === TransactionType.DEPOSIT || type === TransactionType.BUY
              ? 'in-transaction-logo'
              : type === TransactionType.WITHDRAWAL ||
                type === TransactionType.SEND
              ? 'out-transaction-logo'
              : status === TransactionStatus.PENDING
              ? 'pending-transaction-logo'
              : status === TransactionStatus.REJECTED
              ? 'rejected-transaction-logo'
              : ''
          }`}
        />
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
