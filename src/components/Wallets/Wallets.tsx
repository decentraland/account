import React from 'react'
import { Network } from '@dcl/schemas'
import { DepositStatus, WithdrawalStatus } from '../../modules/mana/types'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'
import { AccountCard } from './AccountCard'
import AccountCardContainer from './AccountCardContainer/AccountCardContainer'
import { Props } from './Wallets.types'

import './Wallets.css'

const Wallets: React.FC<Props> = ({ withdrawals, deposits, transactionsByNetwork }) => {
  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  const maticTransactions = transactionsByNetwork[Network.MATIC]

  const isFirstWithdrawal = withdrawals.length === 1 && withdrawals[0].status === WithdrawalStatus.PENDING
  const isFirstDeposits = deposits.length === 1 && deposits[0].status === DepositStatus.PENDING

  return (
    <>
      <AccountCardContainer>
        <AccountCard network={Network.ETHEREUM} title="Ethereum MANA" transactions={ethereumTransactions} />
        <AccountCard network={Network.MATIC} title="Polygon MANA" transactions={maticTransactions} />
      </AccountCardContainer>
      {isFirstDeposits ? <DepositTooltip /> : isFirstWithdrawal ? <WithdrawalTooltip /> : null}
    </>
  )
}

export default React.memo(Wallets)
