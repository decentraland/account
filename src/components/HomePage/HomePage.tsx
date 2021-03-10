import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Footer } from 'decentraland-dapps/dist/containers'
import { Navbar } from '../Navbar'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { TransactionStatus, TransactionType } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC = ({ transactionsByNetwork }) => {
  console.log({ transactionsByNetwork })
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            network={Network.ETHEREUM}
            title="Mana"
            transactions={[
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
            ]}
          />
          <AccountCard
            network={Network.MATIC}
            title="Matic Mana"
            transactions={[
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.PENDING,
                amount: 3000,
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000,
              },
            ]}
          />
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
