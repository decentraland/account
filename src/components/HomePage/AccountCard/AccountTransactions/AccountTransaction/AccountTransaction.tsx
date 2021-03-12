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
            type === TransactionType.DEPOSIT
              ? 'in-transaction-logo'
              : type === TransactionType.WITHDRAWAL
              ? 'out-transaction-logo'
              : status === TransactionStatus.PENDING
              ? 'pending-transaction-logo'
              : ''
          }`}
        />
      </div>
      <div className="DescriptionStatus">
        <div> {description} </div>
        <div> {status} </div>
      </div>
      <div> {amount} </div>
    </div>
  )
}

export default React.memo(AccountTransaction)
