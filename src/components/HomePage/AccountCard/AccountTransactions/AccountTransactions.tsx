import React from 'react'
import { Props } from './AccountTransactions.types'
import { AccountTransaction } from './AccountTransaction'
import './AccountTransactions.css'

const AccountTransactions = ({ transactions }: Props) => (
  <div className="TransactionData">
    {transactions.length > 0 ? (
      transactions.map((transaction, index) => (
        <AccountTransaction transaction={transaction} key={index} />
      ))
    ) : (
      <div className="no-transactions-message">
        <p> No transactions yet </p>
      </div>
    )}
  </div>
)

export default React.memo(AccountTransactions)
