import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'
import DepositTooltip from '../Tooltips/DepositTooltip'
import WithdrawalTooltip from '../Tooltips/WithdrawalTooltip'
import { TransactionStatus, TransactionType } from '../../modules/mana/types'

const HomePage: React.FC<Props> = ({ transactionsByNetwork }) => {
  console.log(transactionsByNetwork)
  const ethereumTransactions = transactionsByNetwork[Network.ETHEREUM]
  const maticTransactions = transactionsByNetwork[Network.MATIC]
  const deposits = ethereumTransactions.filter(
    (t) => t.type === TransactionType.DEPOSIT
  )
  const withdrawals = maticTransactions.filter(
    (t) => t.type === TransactionType.WITHDRAWAL
  )
  const isFirstWithdrawal =
    withdrawals.length === 1 &&
    withdrawals[0].status === TransactionStatus.PENDING
  const isFirstDeposits =
    deposits.length === 1 && deposits[0].status === TransactionStatus.PENDING

  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            network={Network.ETHEREUM}
            title="Ethereum MANA"
            transactions={ethereumTransactions}
          />
          <AccountCard
            network={Network.MATIC}
            title="Polygon MANA"
            transactions={maticTransactions}
          />
        </AccountCardContainer>
        {isFirstDeposits ? (
          <DepositTooltip />
        ) : isFirstWithdrawal ? (
          <WithdrawalTooltip />
        ) : null}
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
