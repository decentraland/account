import * as React from 'react'

import { Network } from '@dcl/schemas'

import { Page } from 'decentraland-ui'

import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import { DepositStatus, WithdrawalStatus } from '../../modules/mana/types'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'

import './HomePage.css'

const HomePage: React.FC<Props> = ({ withdrawals, deposits, transactionsByNetwork }) => {
  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  const maticTransactions = transactionsByNetwork[Network.MATIC]

  const isFirstWithdrawal = withdrawals.length === 1 && withdrawals[0].status === WithdrawalStatus.PENDING
  const isFirstDeposits = deposits.length === 1 && deposits[0].status === DepositStatus.PENDING

  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountCardContainer>
          <AccountCard network={Network.ETHEREUM} title="Ethereum MANA" transactions={ethereumTransactions} />
          <AccountCard network={Network.MATIC} title="Polygon MANA" transactions={maticTransactions} />
        </AccountCardContainer>
        {isFirstDeposits ? <DepositTooltip /> : isFirstWithdrawal ? <WithdrawalTooltip /> : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
