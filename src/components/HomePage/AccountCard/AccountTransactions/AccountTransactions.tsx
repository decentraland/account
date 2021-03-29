import React from 'react'
import { Props } from './AccountTransactions.types'
import { AccountTransaction } from './AccountTransaction'
import './AccountTransactions.css'

const AccountTransactions = ({ transactions }: Props) => (
  <div className="TransactionData">
    {transactions.map((transaction, index) => (
      <AccountTransaction transaction={transaction} key={index} />
    ))}
  </div>
)

export default React.memo(AccountTransactions)
