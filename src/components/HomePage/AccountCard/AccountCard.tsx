import React, { useEffect, useState } from 'react'
import { Card } from 'decentraland-ui'
import './AccountCard.css'
import { AccountCardHeader } from './AccountCardHeader'
import { AccountTransactions } from './AccountTransactions'

const AccountCard = ({
  type,
  title,
  onFetchAmount,
  onFetchTransactions
}: any) => {
  const [amount, setAmount] = useState(0)
  const [transactions, setTransactions] = useState({ latest: [], pending: [] })

  useEffect(() => {
    const a = onFetchAmount()
    setAmount(a)
    const t = onFetchTransactions()
    setTransactions(t)
  }, [])

  return (
    <Card className="AccountCard">
      <AccountCardHeader type={type} title={title} amount={amount} />
      <div className="AccountTransactions">
        {transactions.pending.length > 0 ? (
          <div className="description">
            <div> Pending Transactions </div>
          </div>
        ) : null}
        <AccountTransactions transactions={transactions.pending} />
        <div className="description">
          <div> Latest Transactions </div>
          <div> See all </div>
        </div>
        <AccountTransactions transactions={transactions.latest} />
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
