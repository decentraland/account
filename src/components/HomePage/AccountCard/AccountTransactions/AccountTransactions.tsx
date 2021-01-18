import React from 'react'
import { Props } from './AccountTransactions.types'
import { AccountTransaction } from './AccountTransaction'
import './AccountTransactions.css'

const AccountTransactions = ({ transactions }: Props) => (
  <div className="TransactionData">
    {transactions.map(({ type, status, description, amount }, index) => (
      <AccountTransaction
        type={type}
        status={status}
        description={description}
        amount={amount}
        key={index}
      />
    ))}
  </div>
)

export default React.memo(AccountTransactions)
