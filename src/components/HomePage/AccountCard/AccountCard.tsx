import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Card } from 'decentraland-ui'
import { TransactionStatus } from '../HomePage.types'
import { AccountCardHeader } from './AccountCardHeader'
import { Props } from './AccountCard.types'
import { AccountTransactions } from './AccountTransactions'
import './AccountCard.css'

const AccountCard = ({
  type,
  title,
  amount,
  transactions,
  onSeeAll,
}: Props) => {
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
            <div> {t('account_card.tx_pending')} </div>
          </div>
        ) : null}
        <AccountTransactions transactions={pending} />
        <div className="description">
          <div> {t('account_card.tx_latests')} </div>
          <div>
            <div className="see-all" onClick={() => onSeeAll(transactions)}>
              {t('account_card.see_all')}
            </div>
          </div>
        </div>
        <AccountTransactions transactions={latest} />
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
