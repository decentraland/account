import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Card } from 'decentraland-ui'
import {
  TransactionType,
  WithdrawalStatus,
  DepositStatus,
  TransferStatus,
  TransactionStatus,
} from '../../../modules/mana/types'
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
  const isPending = (
    type: TransactionType,
    parentStatus: TransactionStatus,
    childStatus: any
  ) => {
    if (parentStatus === TransactionStatus.PENDING) {
      return true
    }
    if (type === TransactionType.WITHDRAWAL) {
      if (
        childStatus === WithdrawalStatus.CHECKPOINT ||
        childStatus === WithdrawalStatus.PENDING
      ) {
        return true
      }
    } else if (type === TransactionType.DEPOSIT) {
      if (childStatus === DepositStatus.PENDING) {
        return true
      }
    } else if (type === TransactionType.TRANSFER) {
      if (childStatus === TransferStatus.PENDING) {
        return true
      }
    }
    return false
  }

  const pending = transactions
    .reverse()
    .filter((tx) => isPending(tx.type, tx.status, tx.data.status))
    .slice(0, MAX_TXS_TO_SHOW_PER_STATUS)

  const latest = transactions
    .reverse()
    .filter((tx) => !isPending(tx.type, tx.status, tx.data.status))
    .slice(0, MAX_TXS_TO_SHOW_PER_STATUS)

  const handleOnSeeAll = () => onSeeAll(transactions)
  return (
    <Card className="AccountCard">
      <AccountCardHeader network={network} title={title} amount={amount} />
      <div className="AccountTransactions">
        <div>
          <div className="see-all" onClick={handleOnSeeAll}>
            {t('account_card.see_all')}
          </div>
        </div>
        {pending.length > 0 ? (
          <>
            <div className="description">
              <div> {t('account_card.tx_pending')} </div>
            </div>
            <AccountTransactions transactions={pending} />
          </>
        ) : null}
        <div className="description">
          <div> {t('account_card.tx_latests')} </div>
        </div>
        <AccountTransactions transactions={latest} />
      </div>
    </Card>
  )
}

export default React.memo(AccountCard)
