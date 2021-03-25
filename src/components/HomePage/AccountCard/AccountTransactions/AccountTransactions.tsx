import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Props } from './AccountTransactions.types'
import { AccountTransaction } from './AccountTransaction'
import './AccountTransactions.css'

const AccountTransactions = ({ transactions, isEmpty }: Props) => (
  <div className="TransactionData">
    {transactions.length > 0 ? (
      transactions.map((transaction, index) => (
        <AccountTransaction transaction={transaction} key={index} />
      ))
    ) : isEmpty ? (
      <div className="no-transactions-message">
        <p>{t('account_card.empty')}</p>
      </div>
    ) : null}
  </div>
)

export default React.memo(AccountTransactions)
