import React from 'react'
import { TransactionStatus, TransactionType } from '../../../HomePage.types'
import { Props } from './AccountTransaction.types'
import './AccountTransaction.css'

const AccountTransaction = ({
  amount,
  type,
  status,
  description,
  onTransactionDetail
}: Props) => (
  <div
    className="AccountTransaction"
    onClick={() => onTransactionDetail(description, amount, status, type)}
  >
    <div className="type">
      <div
        className={
          type === TransactionType.DEPOSIT
            ? 'in-transaction-logo'
            : type === TransactionType.WITHDRAWAL
            ? 'out-transaction-logo'
            : status === TransactionStatus.PENDING
            ? 'pending-transaction-logo'
            : ''
        }
      />
    </div>
    <div className="DescriptionStatus">
      <div> {description} </div>
      <div> {status} </div>
    </div>
    <div> {amount} </div>
  </div>
)

export default React.memo(AccountTransaction)
