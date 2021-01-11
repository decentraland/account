import React, { useEffect, useState } from 'react'
import { Button, Card, Icon } from 'decentraland-ui'
import './AccountCard.css'

const AccountCardHeader = ({ type, title, amount }: any) => (
  <div className="AccountCardHeader">
    <div className="title">{title}</div>
    <div className="fundsContainer">
      <div className="funds">
        <div className="amount">
          <div className={type === 'matic' ? 'matic-logo' : 'mana-logo'} />
          {amount}
        </div>
      </div>
      <div className="actions">
        <Button>
          <Icon name="plus" />
        </Button>
        <Button>Convert</Button>
      </div>
    </div>
  </div>
)

const AccountTransaction = ({ amount, type, status, description }: any) => (
  <div className="AccountTransaction">
    <div className="type">
      <div
        className={
          type === 'input'
            ? 'in-transaction-logo'
            : type === 'output'
            ? 'out-transaction-logo'
            : type === 'pending'
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

const AccountTransactions = ({ children }: any) => (
  <div className="TransactionData">{children}</div>
)
const AccountCard = ({
  type,
  title,
  onFetchAmount,
  onFetchTransactions
}: any) => {
  const [amount, setAmount] = useState('')
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
        <AccountTransactions>
          {transactions.pending.map(
            ({ type, status, description, amount }, index) => (
              <AccountTransaction
                type={type}
                status={status}
                description={description}
                amount={amount}
                key={index}
              />
            )
          )}
        </AccountTransactions>

        <div className="description">
          <div> Latest Transactions </div>
          <div> See all </div>
        </div>
        <AccountTransactions>
          {transactions.latest.map(
            ({ type, status, description, amount }, index) => (
              <AccountTransaction
                type={type}
                status={status}
                description={description}
                amount={amount}
                key={index}
              />
            )
          )}
        </AccountTransactions>
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
