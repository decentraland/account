import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Card } from 'decentraland-ui'
import { isPendingAccountTransaction } from '../../../modules/mana/utils'
import { AccountCardHeader } from './AccountCardHeader'
import { Props } from './AccountCard.types'
import { AccountTransactions } from './AccountTransactions'
import './AccountCard.css'

const MAX_TXS_TO_SHOW_PER_STATUS = 4

const AccountCard = ({
  network,
  title,
  amount,
  transactions,
  onSeeAll,
}: Props) => {
  const pending = transactions
    .filter((tx) =>
      isPendingAccountTransaction(tx.type, tx.status, tx.data.status)
    )
    .slice(0, MAX_TXS_TO_SHOW_PER_STATUS)

  const latest = transactions
    .filter(
      (tx) => !isPendingAccountTransaction(tx.type, tx.status, tx.data.status)
    )
    .slice(0, MAX_TXS_TO_SHOW_PER_STATUS)

  const handleOnSeeAll = () => onSeeAll(transactions, network)
  return (
    <Card className="AccountCard">
      <AccountCardHeader network={network} title={title} amount={amount} />
      <div className="AccountTransactions">
        <div>
          {transactions.length > 0 ? (
            <div className="see-all" onClick={handleOnSeeAll}>
              {t('account_card.see_all')}
            </div>
          ) : null}
        </div>
        {pending.length > 0 ? (
          <>
            <div className="description">
              <div> {t('account_card.tx_pending')} </div>
            </div>
            <AccountTransactions transactions={pending} />
          </>
        ) : null}
        {latest.length > 0 ? (
          <>
            <div className="description">
              <div> {t('account_card.tx_latests')} </div>
            </div>
            <AccountTransactions transactions={latest} />
          </>
        ) : null}
        {transactions.length === 0 ? <div className="empty" /> : null}
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
