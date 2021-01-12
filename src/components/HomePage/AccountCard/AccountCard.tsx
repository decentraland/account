import React, { useEffect, useState } from 'react'
import { Card } from 'decentraland-ui'
import { Transaction, TransactionStatus } from '../HomePage.types'
import { AccountCardHeader } from './AccountCardHeader'
import { Props } from './AccountCard.types'
import { AccountTransactions } from './AccountTransactions'
import './AccountCard.css'

const AccountCard = ({
  type,
  title,
  onFetchAmount,
  onFetchTransactions,
}: Props) => {
  const [amount, setAmount] = useState(0)
  const [transactions, setTransactions]: [Transaction[], any] = useState([])

  useEffect(() => {
    const a = onFetchAmount()
    setAmount(a)
    const t = onFetchTransactions()
    setTransactions(t)
  }, [])

  const pending = transactions.filter(
    (tx) => tx.status === TransactionStatus.PENDING
  )
  const latest = transactions.filter(
    (tx) => tx.status !== TransactionStatus.PENDING
  )

  return (
    <Card className="AccountCard">
      <AccountCardHeader type={type} title={title} amount={amount} />
      <div className="AccountTransactions">
        {pending.length > 0 ? (
          <div className="description">
            <div> Pending Transactions </div>
          </div>
        ) : null}
        <AccountTransactions transactions={pending} />
        <div className="description">
          <div> Latest Transactions </div>
          <div> See all </div>
        </div>
        <AccountTransactions transactions={latest} />
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
